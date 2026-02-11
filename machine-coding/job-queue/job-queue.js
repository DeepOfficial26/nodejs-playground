/**
 * Job Queue - Machine Coding Round
 * 
 * Requirements:
 * - In-memory job queue
 * - Retry mechanism with exponential backoff
 * - Priority support
 * - Failure handling
 * - Worker processing
 * 
 * Constraints:
 * - Single process (can extend to distributed)
 * - Configurable retry attempts
 * - Configurable delay between retries
 */

/**
 * Job Queue with Retry and Priority
 * WHY: Demonstrates queue management, retry logic, priority handling
 */
export class JobQueue {
  constructor(options = {}) {
    this.maxRetries = options.maxRetries || 3;
    this.retryDelay = options.retryDelay || 1000;
    this.concurrency = options.concurrency || 1;
    
    this.queue = []; // WHY: Priority queue (simple array for demo)
    this.processing = new Set();
    this.failed = [];
    this.completed = [];
  }
  
  /**
   * Add job to queue
   * WHY: Supports priority (higher number = higher priority)
   */
  add(job, priority = 0) {
    const jobItem = {
      id: `job-${Date.now()}-${Math.random()}`,
      job,
      priority,
      attempts: 0,
      createdAt: Date.now()
    };
    
    // WHY: Insert based on priority
    const index = this.queue.findIndex(item => item.priority < priority);
    if (index === -1) {
      this.queue.push(jobItem);
    } else {
      this.queue.splice(index, 0, jobItem);
    }
    
    this.process();
    return jobItem.id;
  }
  
  /**
   * Process jobs
   * WHY: Handles concurrency, retries, failures
   */
  async process() {
    // WHY: Respect concurrency limit
    if (this.processing.size >= this.concurrency) {
      return;
    }
    
    if (this.queue.length === 0) {
      return;
    }
    
    const jobItem = this.queue.shift();
    this.processing.add(jobItem.id);
    
    try {
      // WHY: Execute job
      const result = await this.executeJob(jobItem.job);
      this.completed.push({ ...jobItem, result, completedAt: Date.now() });
    } catch (error) {
      jobItem.attempts++;
      
      // WHY: Retry with exponential backoff
      if (jobItem.attempts < this.maxRetries) {
        const delay = this.retryDelay * Math.pow(2, jobItem.attempts - 1);
        setTimeout(() => {
          this.queue.push(jobItem);
          this.process();
        }, delay);
      } else {
        // WHY: Max retries exceeded - mark as failed
        this.failed.push({ ...jobItem, error: error.message, failedAt: Date.now() });
      }
    } finally {
      this.processing.delete(jobItem.id);
      // WHY: Process next job
      this.process();
    }
  }
  
  /**
   * Execute job
   * WHY: Wrapper for job execution - can be overridden
   */
  async executeJob(job) {
    if (typeof job === 'function') {
      return await job();
    }
    throw new Error('Job must be a function');
  }
  
  /**
   * Get queue status
   * WHY: Useful for monitoring
   */
  getStatus() {
    return {
      queued: this.queue.length,
      processing: this.processing.size,
      completed: this.completed.length,
      failed: this.failed.length
    };
  }
  
  /**
   * Clear completed/failed jobs
   * WHY: Prevent memory leaks
   */
  clear() {
    this.completed = [];
    this.failed = [];
  }
}
