/**
 * Pub-Sub System - Machine Coding Round
 * 
 * Requirements:
 * - Publish messages to topics
 * - Subscribe to topics
 * - Unsubscribe
 * - Multiple subscribers per topic
 * - Message persistence (optional)
 * 
 * Constraints:
 * - In-memory (can extend to Redis/RabbitMQ)
 * - Single process
 */

/**
 * Pub-Sub System
 * WHY: Demonstrates observer pattern, event-driven architecture
 */
export class PubSubSystem {
  constructor() {
    this.subscribers = new Map(); // WHY: topic -> Set of subscribers
    this.messageHistory = new Map(); // WHY: Optional - store message history
  }
  
  /**
   * Subscribe to topic
   * WHY: Adds subscriber callback to topic
   */
  subscribe(topic, callback) {
    if (!this.subscribers.has(topic)) {
      this.subscribers.set(topic, new Set());
    }
    
    this.subscribers.get(topic).add(callback);
    
    // WHY: Return unsubscribe function
    return () => this.unsubscribe(topic, callback);
  }
  
  /**
   * Unsubscribe from topic
   * WHY: Removes subscriber callback
   */
  unsubscribe(topic, callback) {
    const subscribers = this.subscribers.get(topic);
    if (subscribers) {
      subscribers.delete(callback);
      if (subscribers.size === 0) {
        this.subscribers.delete(topic);
      }
    }
  }
  
  /**
   * Publish message to topic
   * WHY: Notifies all subscribers
   */
  publish(topic, message) {
    const subscribers = this.subscribers.get(topic);
    
    if (subscribers) {
      // WHY: Store message history (optional)
      if (!this.messageHistory.has(topic)) {
        this.messageHistory.set(topic, []);
      }
      this.messageHistory.get(topic).push({
        message,
        timestamp: Date.now()
      });
      
      // WHY: Notify all subscribers
      subscribers.forEach(callback => {
        try {
          callback(message, topic);
        } catch (error) {
          console.error(`Error in subscriber for topic ${topic}:`, error);
        }
      });
    }
    
    return subscribers ? subscribers.size : 0;
  }
  
  /**
   * Get message history for topic
   * WHY: Useful for debugging, replay
   */
  getHistory(topic, limit = 10) {
    const history = this.messageHistory.get(topic) || [];
    return history.slice(-limit);
  }
  
  /**
   * Get subscriber count for topic
   * WHY: Useful for monitoring
   */
  getSubscriberCount(topic) {
    return this.subscribers.get(topic)?.size || 0;
  }
  
  /**
   * List all topics
   * WHY: Useful for debugging
   */
  getTopics() {
    return Array.from(this.subscribers.keys());
  }
  
  /**
   * Clear topic
   * WHY: Remove all subscribers and history
   */
  clearTopic(topic) {
    this.subscribers.delete(topic);
    this.messageHistory.delete(topic);
  }
}
