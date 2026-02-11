# Node.js Interview Playground 🚀

A comprehensive learning platform for Node.js backend interviews, covering concepts from Beginner to Lead/Architect level with extensive Machine Coding Round scenarios.

## 🎯 Goals

- Prepare for backend interviews (SDE2 / Senior / Lead / FAANG)
- Focus on Node.js internals and architecture
- Demonstrate concepts with runnable examples
- Visualize behavior using EJS templates
- Emphasize **WHY** over **WHAT**

## 📚 Structure

```
nodejs/
├── server.js                 # Main Express server
├── routes/                   # Route handlers for each level
├── modules/                  # Core concept implementations
│   ├── beginner/            # Node.js basics
│   ├── intermediate/        # Async & concurrency
│   ├── advanced/            # Internals & performance
│   ├── lead/                # Architecture patterns
│   └── security/            # Security & reliability
├── machine-coding/          # Machine coding scenarios
│   ├── rate-limiter/
│   ├── job-queue/
│   ├── file-upload/
│   ├── chat-server/
│   └── api-gateway/
├── views/                    # EJS templates
└── public/                   # Static assets
```

## 🚀 Quick Start

```bash
cd nodejs
npm install
npm start
```

Navigate to `http://localhost:3000`

## 📖 Learning Path

### 1️⃣ Beginner Level
- Node.js runtime architecture (V8 + libuv)
- CommonJS vs ES Modules
- Core modules (fs, path, os, http)
- Event loop basics
- Blocking vs non-blocking code
- Simple HTTP server

### 2️⃣ Intermediate Level
- Call stack, microtask queue, macrotask queue
- Promises vs async/await
- Timers (setTimeout, setImmediate, nextTick)
- Streams & buffers
- Express.js middleware
- File operations

### 3️⃣ Advanced Level
- Event loop phases (timers, poll, check, close)
- Worker threads vs child_process
- Cluster mode
- Backpressure handling
- Graceful shutdown
- Garbage collection basics
- AbortController

### 4️⃣ Lead/Architect Level
- Stateless vs stateful backend
- Horizontal vs vertical scaling
- Load balancing strategies
- Circuit breaker pattern
- Bulkhead pattern
- Retry with jitter
- Distributed locking
- Observability (logs, metrics, tracing)
- Zero-downtime deployment

### 5️⃣ Security & Reliability
- Rate limiting
- Input validation
- XSS/CSRF protection
- SSRF prevention
- Secrets management
- Error handling (uncaughtException vs unhandledRejection)
- Process crash recovery

### 6️⃣ Machine Coding Rounds

#### Core Patterns
- In-memory cache with TTL
- LRU cache
- Rate limiter (token bucket + sliding window)
- Debouncer & throttler
- Logger system
- Request deduplication

#### Backend Systems
- Job queue with retry & delay
- Pub-sub system
- Notification system
- API gateway
- Auth service (JWT)

#### Streaming & Realtime
- File upload server (streaming)
- Video streaming server
- WebSocket chat server
- SSE notification system

#### Architecture-Oriented
- Payment processing simulator
- Order processing pipeline
- Webhook delivery system
- Distributed rate limiter

## 🎓 Interview Preparation

Each module includes:
- ✅ Runnable examples
- ✅ EJS visualization
- ✅ Interview questions
- ✅ Performance notes
- ✅ Architecture explanations
- ✅ Failure case handling

## 💡 Philosophy

- **Architecture-first**: Understand the why before the how
- **Interview-oriented**: Focus on what interviewers ask
- **Progressive**: Build from basics to advanced concepts
- **Practical**: Every concept is demonstrable
- **Clean**: No unnecessary frameworks or complexity

## 📝 Notes

- Uses modern Node.js (ESM, async/await, worker_threads)
- Comments explain **WHY**, not **WHAT**
- No business logic - pure concept demonstration
- All examples are production-ready patterns

## 🤝 Contributing

This is a learning resource. Feel free to extend with more examples and scenarios!

---

**Built for serious backend engineers preparing for interviews** 🎯
