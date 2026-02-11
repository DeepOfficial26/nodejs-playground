/**
 * Rate Limiting
 * WHY: Essential security measure - prevent abuse, DDoS
 * 
 * Strategies:
 * - Fixed window: Simple, but allows bursts
 * - Sliding window: More accurate, smoother
 * - Token bucket: Allows bursts with refill
 */

/**
 * Simple in-memory rate limiter
 * WHY: Demonstrates basic rate limiting concept
 */
export class RateLimiter {
  constructor(maxRequests, windowMs) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = new Map(); // WHY: Store requests per IP
  }
  
  isAllowed(identifier) {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];
    
    // WHY: Remove old requests outside window
    const validRequests = userRequests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    // WHY: Add current request
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    
    return true;
  }
  
  reset(identifier) {
    this.requests.delete(identifier);
  }
}

/**
 * Token bucket rate limiter
 * WHY: More sophisticated - allows bursts
 */
export class TokenBucketLimiter {
  constructor(capacity, refillRate) {
    this.capacity = capacity;
    this.refillRate = refillRate; // tokens per second
    this.tokens = new Map(); // WHY: Store tokens per identifier
  }
  
  isAllowed(identifier) {
    const now = Date.now();
    const userTokens = this.tokens.get(identifier) || { tokens: this.capacity, lastRefill: now };
    
    // WHY: Refill tokens based on time passed
    const timePassed = (now - userTokens.lastRefill) / 1000;
    userTokens.tokens = Math.min(
      this.capacity,
      userTokens.tokens + (timePassed * this.refillRate)
    );
    userTokens.lastRefill = now;
    
    if (userTokens.tokens >= 1) {
      userTokens.tokens -= 1;
      this.tokens.set(identifier, userTokens);
      return true;
    }
    
    this.tokens.set(identifier, userTokens);
    return false;
  }
}
