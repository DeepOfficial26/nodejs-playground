/**
 * Graceful Shutdown
 * WHY: Critical for production - ensures no data loss, clean resource cleanup
 * 
 * Graceful shutdown:
 * - Stop accepting new requests
 * - Finish processing current requests
 * - Close connections
 * - Clean up resources
 */

/**
 * Demonstrate graceful shutdown pattern
 * WHY: Shows production-ready shutdown handling
 */
export function createGracefulShutdown(server) {
  const shutdown = (signal) => {
    console.log(`${signal} received, starting graceful shutdown...`);
    
    // WHY: Stop accepting new connections
    server.close(() => {
      console.log('HTTP server closed');
      
      // WHY: Close database connections, cleanup
      // db.close();
      // redis.quit();
      
      console.log('Graceful shutdown complete');
      process.exit(0);
    });
    
    // WHY: Force shutdown after timeout
    setTimeout(() => {
      console.error('Forced shutdown after timeout');
      process.exit(1);
    }, 10000);
  };
  
  // WHY: Handle different shutdown signals
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
  
  // WHY: Handle uncaught errors
  process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
    shutdown('uncaughtException');
  });
  
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled rejection:', reason);
    shutdown('unhandledRejection');
  });
  
  return shutdown;
}
