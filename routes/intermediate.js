/**
 * Intermediate Level Routes
 * WHY: Demonstrates async patterns, streams, and middleware
 */

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

import * as asyncModule from '../modules/intermediate/async-patterns.js';
import * as streamsModule from '../modules/intermediate/streams.js';
import * as middlewareModule from '../modules/intermediate/middleware.js';

router.get('/', (req, res) => {
  res.render('intermediate/index', {
    title: 'Intermediate Level - Async & Web',
    topics: [
      { name: 'Async Patterns', path: '/intermediate/async', description: 'Promises, async/await, queues' },
      { name: 'Streams', path: '/intermediate/streams', description: 'Readable, Writable, Transform streams' },
      { name: 'Middleware', path: '/intermediate/middleware', description: 'Express middleware pattern' }
    ]
  });
});

router.get('/async', async (req, res) => {
  const demo = await asyncModule.runAsyncDemo();
  res.render('intermediate/async', { title: 'Async Patterns', demo });
});

router.get('/streams', async (req, res) => {
  const examples = await streamsModule.runStreamsDemo();
  res.render('intermediate/streams', { title: 'Streams & Buffers', examples });
});

router.get('/middleware', (req, res) => {
  res.render('intermediate/middleware', { title: 'Middleware Pattern' });
});

export default router;
