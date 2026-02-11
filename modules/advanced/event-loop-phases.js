/**
 * Event Loop Phases (Advanced)
 * WHY: Deep understanding of event loop phases is critical for senior roles
 * 
 * Phases:
 * 1. Timers: setTimeout, setInterval
 * 2. Pending callbacks: Deferred I/O callbacks
 * 3. Idle, prepare: Internal
 * 4. Poll: Fetch new I/O events, execute I/O callbacks
 * 5. Check: setImmediate callbacks
 * 6. Close: close callbacks
 */

/**
 * Demonstrate event loop phases
 * WHY: Shows exact execution order in different phases
 */
export async function runPhasesDemo() {
  const phaseLog = [];
  
  // WHY: This demonstrates phase execution order
  phaseLog.push({ phase: 'Start', message: 'Synchronous code' });
  
  // Timers phase
  setTimeout(() => {
    phaseLog.push({ phase: 'Timers', message: 'setTimeout callback' });
  }, 0);
  
  // Check phase (setImmediate)
  setImmediate(() => {
    phaseLog.push({ phase: 'Check', message: 'setImmediate callback' });
  });
  
  // Poll phase (I/O)
  const fs = await import('fs/promises');
  fs.readFile(import.meta.url).then(() => {
    phaseLog.push({ phase: 'Poll', message: 'I/O callback (readFile)' });
  });
  
  // Close phase
  const server = (await import('http')).createServer();
  server.on('close', () => {
    phaseLog.push({ phase: 'Close', message: 'close callback' });
  });
  
  // Wait for async operations
  await new Promise(resolve => setTimeout(resolve, 50));
  
  return {
    phases: [
      { name: 'Timers', description: 'setTimeout, setInterval callbacks' },
      { name: 'Pending', description: 'Deferred I/O callbacks' },
      { name: 'Idle/Prepare', description: 'Internal use only' },
      { name: 'Poll', description: 'Fetch new I/O events, execute I/O callbacks' },
      { name: 'Check', description: 'setImmediate callbacks' },
      { name: 'Close', description: 'close callbacks (socket.on("close"))' }
    ],
    executionLog: phaseLog,
    keyPoints: [
      'Event loop processes phases in order',
      'Poll phase can block if queue is empty',
      'setImmediate runs in Check phase (after Poll)',
      'setTimeout(0) runs in Timers phase',
      'I/O operations use thread pool (libuv)'
    ]
  };
}
