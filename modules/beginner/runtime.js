/**
 * Node.js Runtime Architecture
 * WHY: Understanding V8 + libuv is fundamental to Node.js
 * 
 * Key Concepts:
 * - V8: JavaScript engine (call stack, heap, garbage collection)
 * - libuv: Event loop, thread pool, async I/O
 * - Single-threaded event loop with multi-threaded I/O
 */

import os from 'os';
import process from 'process';
import v8 from 'v8';

/**
 * Get runtime information
 * WHY: Shows actual Node.js runtime characteristics
 */
export function getRuntimeInfo() {
  return {
    nodeVersion: process.version,
    v8Version: process.versions.v8,
    platform: process.platform,
    arch: process.arch,
    pid: process.pid,
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    cpuUsage: process.cpuUsage(),
    heapStatistics: v8.getHeapStatistics(),
    systemInfo: {
      cpus: os.cpus().length,
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
      loadAverage: os.loadavg()
    },
    environment: {
      nodeEnv: process.env.NODE_ENV || 'development',
      execPath: process.execPath
    }
  };
}

/**
 * Demonstrate blocking vs non-blocking
 * WHY: Core concept - blocking code blocks event loop
 */
export function demonstrateBlocking() {
  const start = Date.now();
  
  // Blocking operation - blocks event loop
  const blockingResult = [];
  for (let i = 0; i < 10000000; i++) {
    blockingResult.push(i * 2);
  }
  
  const blockingTime = Date.now() - start;
  
  return {
    blockingTime,
    message: 'Blocking operation completed - event loop was blocked'
  };
}

/**
 * Demonstrate non-blocking
 * WHY: Shows how async operations don't block
 */
export async function demonstrateNonBlocking() {
  const start = Date.now();
  
  // Non-blocking - uses event loop
  return new Promise((resolve) => {
    setTimeout(() => {
      const nonBlockingTime = Date.now() - start;
      resolve({
        nonBlockingTime,
        message: 'Non-blocking operation - event loop continued processing'
      });
    }, 100);
  });
}
