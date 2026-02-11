# Node.js Interview Preparation Guide

## 🎯 Overview

This playground is designed to prepare you for Node.js backend interviews from SDE2 to Lead/Architect levels, including machine coding rounds.

## 📚 Learning Path

### 1. Beginner Level
**Focus**: Core Node.js fundamentals

- **Runtime Architecture**: V8 + libuv, single-threaded event loop
- **Modules System**: CommonJS vs ES Modules
- **Event Loop Basics**: Understanding async execution
- **File System**: fs module, async operations
- **HTTP Server**: Creating servers without frameworks

**Interview Questions**:
- How does Node.js handle concurrency?
- What is the difference between blocking and non-blocking code?
- Explain the event loop in Node.js
- What is libuv and what does it do?

### 2. Intermediate Level
**Focus**: Async patterns and web development

- **Async Patterns**: Promises, async/await, execution queues
- **Streams**: Readable, Writable, Transform, backpressure
- **Middleware**: Express middleware pattern

**Interview Questions**:
- What is the difference between microtask and macrotask queues?
- How do streams handle backpressure?
- Explain the middleware execution order in Express
- When would you use streams vs buffers?

### 3. Advanced Level
**Focus**: Internals and performance

- **Event Loop Phases**: Timers, poll, check, close
- **Workers**: worker_threads vs child_process
- **Cluster**: Multi-core processing
- **Graceful Shutdown**: Process lifecycle management

**Interview Questions**:
- Explain each phase of the event loop
- When would you use worker_threads vs child_process?
- How does cluster mode work?
- What happens during graceful shutdown?

### 4. Lead/Architect Level
**Focus**: System design and scaling

- **Scaling Strategies**: Horizontal vs vertical
- **Load Balancing**: Strategies and trade-offs
- **Circuit Breaker**: Resilience patterns
- **Observability**: Logs, metrics, tracing

**Interview Questions**:
- How would you scale a Node.js application?
- Explain different load balancing strategies
- What is the circuit breaker pattern?
- How do you implement zero-downtime deployments?

### 5. Security & Reliability
**Focus**: Production best practices

- **Rate Limiting**: Token bucket, sliding window
- **Input Validation**: Sanitization, XSS prevention
- **Error Handling**: uncaughtException vs unhandledRejection

**Interview Questions**:
- How would you implement rate limiting?
- What are common security vulnerabilities in Node.js?
- How do you handle errors in production?

### 6. Machine Coding Rounds

#### Core Patterns
- **LRU Cache**: O(1) get/put operations
- **Rate Limiter**: Token bucket, sliding window
- **Debouncer/Throttler**: Event rate limiting

#### Backend Systems
- **Job Queue**: Retry, priority, failure handling
- **Pub-Sub System**: Publisher-subscriber pattern
- **API Gateway**: Routing, rate limiting, circuit breaker

#### Streaming & Realtime
- **File Upload**: Streaming, progress tracking
- **Chat Server**: WebSocket-based real-time communication

## 🎓 Interview Tips

1. **Start with Requirements**: Always clarify requirements before coding
2. **Discuss Trade-offs**: Explain why you chose a particular approach
3. **Handle Edge Cases**: Think about failure scenarios
4. **Optimize Later**: Start with a working solution, then optimize
5. **Ask Questions**: Clarify constraints and assumptions

## 📝 Common Interview Scenarios

### Scenario 1: Rate Limiter
- Requirements: Per-IP rate limiting, configurable limits
- Constraints: In-memory, O(1) operations
- Discussion: Token bucket vs sliding window, distributed rate limiting

### Scenario 2: Job Queue
- Requirements: Retry with exponential backoff, priority support
- Constraints: Single process, configurable retries
- Discussion: Dead letter queue, distributed queues, job persistence

### Scenario 3: LRU Cache
- Requirements: O(1) get/put, configurable capacity
- Constraints: In-memory, thread-safe
- Discussion: Data structure choice, time complexity, distributed cache

### Scenario 4: API Gateway
- Requirements: Proxy requests, rate limiting, error isolation
- Constraints: Single gateway, multiple backends
- Discussion: Service discovery, circuit breaker, load balancing

## 🚀 Practice Strategy

1. **Study Each Module**: Understand the concepts deeply
2. **Run Examples**: Execute code and observe behavior
3. **Implement from Scratch**: Practice machine coding scenarios
4. **Discuss Trade-offs**: Think about alternatives and optimizations
5. **Review Interview Points**: Prepare answers to common questions

## 💡 Key Concepts to Master

- Event loop and its phases
- Async patterns (Promises, async/await)
- Streams and backpressure
- Worker threads vs child processes
- Cluster mode and scaling
- Rate limiting strategies
- Error handling patterns
- Security best practices

## 📖 Additional Resources

- Node.js Official Documentation
- libuv Documentation
- V8 Engine Internals
- System Design Interview Books

---

**Remember**: Understanding WHY is more important than knowing WHAT. Focus on architecture and trade-offs, not just syntax.

Good luck with your interviews! 🎯
