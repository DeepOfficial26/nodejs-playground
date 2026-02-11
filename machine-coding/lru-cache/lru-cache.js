/**
 * LRU Cache - Machine Coding Round
 * 
 * Requirements:
 * - Least Recently Used eviction
 * - O(1) get and put operations
 * - Configurable capacity
 * - TTL support (optional)
 * 
 * Constraints:
 * - In-memory
 * - Thread-safe (single-threaded Node.js)
 */

/**
 * LRU Cache Implementation
 * WHY: Uses doubly-linked list + hash map for O(1) operations
 */
export class LRUCache {
  constructor(capacity, ttl = null) {
    this.capacity = capacity;
    this.ttl = ttl; // WHY: Optional time-to-live in milliseconds
    this.cache = new Map(); // WHY: O(1) lookup
    this.head = null;
    this.tail = null;
  }
  
  /**
   * Get value by key
   * WHY: O(1) - moves node to head (most recently used)
   */
  get(key) {
    const node = this.cache.get(key);
    
    if (!node) {
      return null;
    }
    
    // WHY: Check TTL
    if (this.ttl && Date.now() - node.timestamp > this.ttl) {
      this.delete(key);
      return null;
    }
    
    // WHY: Move to head (most recently used)
    this.moveToHead(node);
    return node.value;
  }
  
  /**
   * Put key-value pair
   * WHY: O(1) - adds/updates and evicts if needed
   */
  put(key, value) {
    let node = this.cache.get(key);
    
    if (node) {
      // WHY: Update existing node
      node.value = value;
      node.timestamp = Date.now();
      this.moveToHead(node);
    } else {
      // WHY: Create new node
      node = {
        key,
        value,
        prev: null,
        next: null,
        timestamp: Date.now()
      };
      
      // WHY: Add to head
      this.addToHead(node);
      this.cache.set(key, node);
      
      // WHY: Evict if over capacity
      if (this.cache.size > this.capacity) {
        this.evict();
      }
    }
  }
  
  /**
   * Delete key
   * WHY: O(1) - removes from cache and list
   */
  delete(key) {
    const node = this.cache.get(key);
    if (!node) return;
    
    this.removeNode(node);
    this.cache.delete(key);
  }
  
  /**
   * Move node to head
   * WHY: Marks as most recently used
   */
  moveToHead(node) {
    if (node === this.head) return;
    
    this.removeNode(node);
    this.addToHead(node);
  }
  
  /**
   * Add node to head
   * WHY: Most recently used at head
   */
  addToHead(node) {
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
  }
  
  /**
   * Remove node from list
   * WHY: Helper for list manipulation
   */
  removeNode(node) {
    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }
    
    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }
  }
  
  /**
   * Evict least recently used
   * WHY: Removes tail (least recently used)
   */
  evict() {
    if (!this.tail) return;
    
    const key = this.tail.key;
    this.removeNode(this.tail);
    this.cache.delete(key);
  }
  
  /**
   * Clear cache
   * WHY: Reset to empty state
   */
  clear() {
    this.cache.clear();
    this.head = null;
    this.tail = null;
  }
  
  /**
   * Get cache size
   * WHY: Useful for monitoring
   */
  size() {
    return this.cache.size;
  }
}
