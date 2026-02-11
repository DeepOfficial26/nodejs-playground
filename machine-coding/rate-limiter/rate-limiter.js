/**
 * Rate Limiter - Machine Coding Round
 * 
 * Requirements:
 * - Token bucket algorithm
 * - Sliding window algorithm
 * - Per-IP rate limiting
 * - Configurable limits
 * 
 * Constraints:
 * - In-memory (can extend to Redis)
 * - Thread-safe (single-threaded Node.js)
 * - O(1) operations where possible
 */

/**
 * Token Bucket Rate Limiter
 * WHY: Allows bursts, smooths traffic
 */
export class TokenBucketRateLimiter {
  constructor(capacity, refillRate) {
    this.capacity = capacity; // Max tokens
    this.refillRate = refillRate; // Tokens per second
    this.buckets = new Map(); // WHY: Store bucket state per identifier
  }
  
  /**
   * Check if request is allowed
   * WHY: O(1) operation - efficient
   */
  isAllowed(identifier) {
    const now = Date.now();
    let bucket = this.buckets.get(identifier);
    
    if (!bucket) {
      bucket = { tokens: this.capacity, lastRefill: now };
      this.buckets.set(identifier, bucket);
      return true;
    }
    
    // WHY: Refill tokens based on time passed
    const timePassed = (now - bucket.lastRefill) / 1000;
    bucket.tokens = Math.min(
      this.capacity,
      bucket.tokens + (timePassed * this.refillRate)
    );
    bucket.lastRefill = now;
    
    if (bucket.tokens >= 1) {
      bucket.tokens -= 1;
      return true;
    }
    
    return false;
  }
  
  reset(identifier) {
    this.buckets.delete(identifier);
  }
}

/**
 * Sliding Window Rate Limiter
 * WHY: More accurate than fixed window, prevents bursts at window boundaries
 */
export class SlidingWindowRateLimiter {
  constructor(maxRequests, windowMs) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = new Map(); // WHY: Store request timestamps per identifier
  }
  
  /**
   * Check if request is allowed
   * WHY: O(n) where n is requests in window - acceptable for small windows
   */
  isAllowed(identifier) {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];
    
    // WHY: Remove requests outside sliding window
    const validRequests = userRequests.filter(
      timestamp => now - timestamp < this.windowMs
    );
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    return true;
  }
  
  reset(identifier) {
    this.requests.delete(identifier);
  }
  
  /**
   * Get remaining requests
   * WHY: Useful for API responses (X-RateLimit-Remaining)
   */
  getRemaining(identifier) {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];
    const validRequests = userRequests.filter(
      timestamp => now - timestamp < this.windowMs
    );
    return Math.max(0, this.maxRequests - validRequests.length);
  }
}

/**
 * Hybrid Rate Limiter (uses both strategies)
 * WHY: Combines benefits of both approaches
 */
export class HybridRateLimiter {
  constructor(maxRequests, windowMs, burstCapacity) {
    this.slidingWindow = new SlidingWindowRateLimiter(maxRequests, windowMs);
    this.tokenBucket = new TokenBucketRateLimiter(burstCapacity, maxRequests / (windowMs / 1000));
  }
  
  isAllowed(identifier) {
    // WHY: Must pass both checks
    return this.slidingWindow.isAllowed(identifier) && 
           this.tokenBucket.isAllowed(identifier);
  }
  
  reset(identifier) {
    this.slidingWindow.reset(identifier);
    this.tokenBucket.reset(identifier);
  }
}
