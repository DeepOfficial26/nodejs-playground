/**
 * Error Handling - uncaughtException vs unhandledRejection
 * WHY: Understanding error handling is critical for production
 */

/**
 * Demonstrate error handling patterns
 * WHY: Shows when to use each error handler
 */
export function setupErrorHandlers() {
  return {
    uncaughtException: {
      description: 'Synchronous errors not caught',
      example: `
        throw new Error('Uncaught!');
      `,
      handler: `
        process.on('uncaughtException', (error) => {
          console.error('Uncaught exception:', error);
          // WHY: Log and exit - app is in unknown state
          process.exit(1);
        });
      `,
      when: 'Synchronous code throws error'
    },
    unhandledRejection: {
      description: 'Promise rejection not handled',
      example: `
        Promise.reject(new Error('Unhandled!'));
      `,
      handler: `
        process.on('unhandledRejection', (reason, promise) => {
          console.error('Unhandled rejection:', reason);
          // WHY: Log and handle - app might still be OK
        });
      `,
      when: 'Promise rejection without .catch()'
    },
    bestPractices: [
      'Always handle promise rejections',
      'Use try/catch for async/await',
      'Log errors before exiting',
      'Graceful shutdown on uncaughtException',
      'Monitor unhandledRejection (might indicate bugs)'
    ]
  };
}
