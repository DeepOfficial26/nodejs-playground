/**
 * Event Loop Basics
 * WHY: Event loop is the heart of Node.js - understanding it is critical
 * 
 * Event Loop Phases:
 * 1. Timers: setTimeout, setInterval
 * 2. Pending callbacks: I/O callbacks deferred
 * 3. Idle, prepare: Internal use
 * 4. Poll: Fetch new I/O events
 * 5. Check: setImmediate callbacks
 * 6. Close: close callbacks
 */

/**
 * Demonstrate event loop behavior
 * WHY: Shows execution order - critical for interviews
 */
export async function runEventLoopDemo() {
  const results = [];
  
  // WHY: This demonstrates the execution order
  // 1. Synchronous code runs first
  results.push({ type: 'sync', message: '1. Synchronous code', order: 1 });
  
  // 2. process.nextTick runs before any other async
  process.nextTick(() => {
    results.push({ type: 'nextTick', message: '2. process.nextTick', order: 2 });
  });
  
  // 3. Promises (microtask queue)
  Promise.resolve().then(() => {
    results.push({ type: 'promise', message: '3. Promise (microtask)', order: 3 });
  });
  
  // 4. setTimeout (macrotask - timers phase)
  setTimeout(() => {
    results.push({ type: 'setTimeout', message: '4. setTimeout (0ms)', order: 4 });
  }, 0);
  
  // 5. setImmediate (check phase)
  setImmediate(() => {
    results.push({ type: 'setImmediate', message: '5. setImmediate', order: 5 });
  });
  
  // Wait for async operations
  await new Promise(resolve => setTimeout(resolve, 10));
  
  return {
    explanation: 'Event Loop Execution Order',
    results: results.sort((a, b) => a.order - b.order),
    keyPoints: [
      'Synchronous code runs first',
      'process.nextTick has highest priority',
      'Microtasks (Promises) run before macrotasks',
      'setTimeout vs setImmediate order can vary',
      'I/O operations are non-blocking'
    ]
  };
}

/**
 * Demonstrate blocking the event loop
 * WHY: Shows what happens when you block
 */
export function demonstrateBlocking() {
  const start = Date.now();
  
  // This blocks the event loop
  while (Date.now() - start < 100) {
    // Busy wait
  }
  
  return {
    message: 'Event loop was blocked for ~100ms',
    impact: 'No other operations could run during this time'
  };
}
