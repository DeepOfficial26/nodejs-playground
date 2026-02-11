/**
 * HTTP Server Basics
 * WHY: Understanding http module is fundamental before Express
 */

import http from 'http';
import { createServer } from 'http';

/**
 * Create a simple HTTP server
 * WHY: Shows raw Node.js HTTP without frameworks
 */
export function createSimpleServer() {
  return createServer((req, res) => {
    // WHY: Set headers before writing response
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from Node.js HTTP server!');
  });
}

/**
 * Demonstrate request handling
 * WHY: Shows how to parse URLs, handle methods
 */
export function handleRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const method = req.method;
  const pathname = url.pathname;
  
  // WHY: Different responses based on route
  if (pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Home</h1>');
  } else if (pathname === '/api/data') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'API response' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}
