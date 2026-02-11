/**
 * Node.js Interview Playground - Main Server
 * 
 * WHY: Central entry point that routes to different learning modules
 * Demonstrates Express routing, middleware, and EJS templating
 */

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// WHY: EJS for server-side templating - shows how to render dynamic content
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// WHY: Static files for CSS/JS assets
app.use(express.static(join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// WHY: Request logging middleware - demonstrates middleware pattern
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Home route - Overview of all modules
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Node.js Interview Playground',
    levels: [
      { name: 'Beginner', path: '/beginner', description: 'Node.js basics, runtime, modules, event loop' },
      { name: 'Intermediate', path: '/intermediate', description: 'Async patterns, streams, middleware' },
      { name: 'Advanced', path: '/advanced', description: 'Event loop phases, workers, cluster' },
      { name: 'Lead/Architect', path: '/lead', description: 'Scaling, patterns, observability' },
      { name: 'Security', path: '/security', description: 'Rate limiting, validation, XSS/CSRF' },
      { name: 'Machine Coding', path: '/machine-coding', description: 'Backend system implementations' }
    ]
  });
});

// Import route modules
import beginnerRoutes from './routes/beginner.js';
import intermediateRoutes from './routes/intermediate.js';
import advancedRoutes from './routes/advanced.js';
import leadRoutes from './routes/lead.js';
import securityRoutes from './routes/security.js';
import machineCodingRoutes from './routes/machine-coding.js';

app.use('/beginner', beginnerRoutes);
app.use('/intermediate', intermediateRoutes);
app.use('/advanced', advancedRoutes);
app.use('/lead', leadRoutes);
app.use('/security', securityRoutes);
app.use('/machine-coding', machineCodingRoutes);

// WHY: Graceful shutdown - demonstrates proper process lifecycle management
const server = app.listen(PORT, () => {
  console.log(`🚀 Node.js Interview Playground running on http://localhost:${PORT}`);
  console.log(`📚 Navigate to http://localhost:${PORT} to start learning`);
});

// Graceful shutdown handlers
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
