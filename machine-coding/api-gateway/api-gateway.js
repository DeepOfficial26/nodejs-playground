/**
 * API Gateway - Machine Coding Round
 * 
 * Requirements:
 * - Proxy requests to backend services
 * - Rate limiting per client
 * - Error isolation
 * - Request/response transformation
 * - Health checks
 * 
 * Constraints:
 * - Single gateway
 * - Multiple backend services
 */

import http from 'http';
import { RateLimiter } from '../../modules/security/rate-limiting.js';

/**
 * API Gateway
 * WHY: Demonstrates routing, rate limiting, error handling, service discovery
 */
export class APIGateway {
  constructor(options = {}) {
    this.services = new Map(); // WHY: Store backend service configs
    this.rateLimiter = new RateLimiter(
      options.maxRequests || 100,
      options.windowMs || 60000
    );
    this.circuitBreakers = new Map(); // WHY: Circuit breaker per service
  }
  
  /**
   * Register backend service
   * WHY: Service discovery pattern
   */
  registerService(name, config) {
    this.services.set(name, {
      ...config,
      healthy: true,
      lastCheck: Date.now()
    });
    
    // WHY: Initialize circuit breaker
    this.circuitBreakers.set(name, {
      failures: 0,
      state: 'closed', // closed, open, half-open
      lastFailure: null
    });
  }
  
  /**
   * Proxy request to backend service
   * WHY: Route request to appropriate service
   */
  async proxyRequest(serviceName, path, options = {}) {
    const service = this.services.get(serviceName);
    if (!service) {
      throw new Error(`Service ${serviceName} not found`);
    }
    
    // WHY: Check circuit breaker
    const circuitBreaker = this.circuitBreakers.get(serviceName);
    if (circuitBreaker.state === 'open') {
      // WHY: Check if should attempt recovery
      if (Date.now() - circuitBreaker.lastFailure > 60000) {
        circuitBreaker.state = 'half-open';
      } else {
        throw new Error(`Service ${serviceName} circuit breaker is open`);
      }
    }
    
    // WHY: Rate limiting
    const clientId = options.clientId || 'anonymous';
    if (!this.rateLimiter.isAllowed(clientId)) {
      throw new Error('Rate limit exceeded');
    }
    
    // WHY: Make request to backend
    return new Promise((resolve, reject) => {
      const url = new URL(path, service.url);
      const requestOptions = {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname + url.search,
        method: options.method || 'GET',
        headers: {
          ...options.headers,
          'X-Forwarded-For': options.clientId
        }
      };
      
      const req = http.request(requestOptions, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          // WHY: Reset circuit breaker on success
          if (circuitBreaker.state === 'half-open') {
            circuitBreaker.state = 'closed';
            circuitBreaker.failures = 0;
          }
          
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data
          });
        });
      });
      
      req.on('error', (error) => {
        // WHY: Update circuit breaker on failure
        circuitBreaker.failures++;
        circuitBreaker.lastFailure = Date.now();
        
        if (circuitBreaker.failures >= 5) {
          circuitBreaker.state = 'open';
        }
        
        reject(error);
      });
      
      if (options.body) {
        req.write(options.body);
      }
      
      req.end();
    });
  }
  
  /**
   * Health check for service
   * WHY: Monitor service availability
   */
  async healthCheck(serviceName) {
    try {
      const result = await this.proxyRequest(serviceName, '/health', {
        method: 'GET',
        clientId: 'health-check'
      });
      
      const service = this.services.get(serviceName);
      service.healthy = result.statusCode === 200;
      service.lastCheck = Date.now();
      
      return service.healthy;
    } catch (error) {
      const service = this.services.get(serviceName);
      service.healthy = false;
      service.lastCheck = Date.now();
      return false;
    }
  }
  
  /**
   * Get gateway status
   * WHY: Useful for monitoring
   */
  getStatus() {
    return {
      services: Array.from(this.services.entries()).map(([name, config]) => ({
        name,
        healthy: config.healthy,
        lastCheck: config.lastCheck
      })),
      circuitBreakers: Array.from(this.circuitBreakers.entries()).map(([name, cb]) => ({
        name,
        state: cb.state,
        failures: cb.failures
      }))
    };
  }
}
