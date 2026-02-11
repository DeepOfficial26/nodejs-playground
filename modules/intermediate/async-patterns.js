/**
 * Async Patterns - Promises, async/await, Queues
 * WHY: Understanding async execution is critical for Node.js interviews
 */

/**
 * Demonstrate call stack, microtask queue, macrotask queue
 * WHY: Shows execution order - critical interview topic
 */
export async function runAsyncDemo() {
  const executionOrder = [];
  
  // WHY: This demonstrates the complete async execution model
  console.log('1. Start');
  executionOrder.push({ step: 1, type: 'sync', message: 'Start' });
  
  // Synchronous
  executionOrder.push({ step: 2, type: 'sync', message: 'Synchronous code' });
  
  // Microtask queue (highest priority after sync)
  Promise.resolve().then(() => {
    executionOrder.push({ step: 3, type: 'microtask', message: 'Promise.then (microtask)' });
  });
  
  // process.nextTick (even higher than microtasks)
  process.nextTick(() => {
    executionOrder.push({ step: 4, type: 'nextTick', message: 'process.nextTick' });
  });
  
  // Macrotask queue
  setTimeout(() => {
    executionOrder.push({ step: 5, type: 'macrotask', message: 'setTimeout (macrotask)' });
  }, 0);
  
  // Another microtask
  Promise.resolve().then(() => {
    executionOrder.push({ step: 6, type: 'microtask', message: 'Another Promise.then' });
  });
  
  // Wait for async operations
  await new Promise(resolve => setTimeout(resolve, 10));
  
  return {
    executionOrder,
    explanation: {
      callStack: 'Synchronous code execution',
      microtaskQueue: 'Promises, queueMicrotask - runs after current task',
      macrotaskQueue: 'setTimeout, setInterval, I/O - runs after microtasks',
      nextTick: 'process.nextTick - highest priority, runs before microtasks'
    },
    keyPoints: [
      'Call stack executes synchronously',
      'Microtasks run before macrotasks',
      'process.nextTick runs before microtasks',
      'Event loop processes queues in order',
      'async/await uses Promises (microtasks)'
    ]
  };
}

/**
 * Demonstrate Promise vs async/await
 * WHY: Shows they're equivalent but async/await is cleaner
 */
export async function demonstratePromises() {
  // Promise chain
  const promiseChain = Promise.resolve(1)
    .then(val => val + 1)
    .then(val => val * 2)
    .then(val => ({ result: val, method: 'Promise chain' }));
  
  // async/await (equivalent)
  const asyncAwait = (async () => {
    let val = 1;
    val = await Promise.resolve(val + 1);
    val = await Promise.resolve(val * 2);
    return { result: val, method: 'async/await' };
  })();
  
  const [chainResult, awaitResult] = await Promise.all([promiseChain, asyncAwait]);
  
  return {
    promiseChain: chainResult,
    asyncAwait: awaitResult,
    note: 'Both produce the same result - async/await is syntactic sugar'
  };
}

/**
 * Demonstrate error handling
 * WHY: Shows proper async error handling patterns
 */
export async function demonstrateErrorHandling() {
  const results = [];
  
  // WHY: Proper error handling in async/await
  try {
    await Promise.reject(new Error('Test error'));
  } catch (error) {
    results.push({ method: 'try/catch with async/await', error: error.message });
  }
  
  // WHY: Error handling in Promise chains
  await Promise.reject(new Error('Promise error'))
    .catch(error => {
      results.push({ method: 'Promise.catch', error: error.message });
    });
  
  return results;
}
