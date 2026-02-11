/**
 * Middleware Pattern
 * WHY: Core Express.js concept - understanding it is essential
 * 
 * Middleware functions:
 * - Execute in order
 * - Can modify req/res
 * - Call next() to continue
 * - Can end request early
 */

/**
 * Demonstrate middleware execution order
 * WHY: Shows how middleware chain works
 */
export function createMiddlewareDemo() {
  const executionLog = [];
  
  // WHY: Middleware functions execute in order
  const middleware1 = (req, res, next) => {
    executionLog.push('Middleware 1');
    next();
  };
  
  const middleware2 = (req, res, next) => {
    executionLog.push('Middleware 2');
    next();
  };
  
  const middleware3 = (req, res, next) => {
    executionLog.push('Middleware 3');
    next();
  };
  
  return {
    middleware: [middleware1, middleware2, middleware3],
    executionLog,
    explanation: 'Middleware executes in order, next() passes control to next middleware'
  };
}
