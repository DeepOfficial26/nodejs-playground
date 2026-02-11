/**
 * Beginner Level Routes
 * WHY: Demonstrates basic Node.js concepts with runnable examples
 */

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Import beginner modules
import * as runtimeModule from '../modules/beginner/runtime.js';
import * as modulesModule from '../modules/beginner/modules.js';
import * as eventLoopModule from '../modules/beginner/event-loop.js';
import * as fsModule from '../modules/beginner/fs-operations.js';
import * as httpModule from '../modules/beginner/http-server.js';

router.get('/', (req, res) => {
  res.render('beginner/index', {
    title: 'Beginner Level - Node.js Basics',
    topics: [
      { name: 'Runtime Architecture', path: '/beginner/runtime', description: 'V8 + libuv, Node.js internals' },
      { name: 'Modules System', path: '/beginner/modules', description: 'CommonJS vs ES Modules' },
      { name: 'Event Loop Basics', path: '/beginner/event-loop', description: 'Understanding the event loop' },
      { name: 'File System', path: '/beginner/fs', description: 'fs module operations' },
      { name: 'HTTP Server', path: '/beginner/http', description: 'Creating HTTP servers' }
    ]
  });
});

router.get('/runtime', async (req, res) => {
  const info = runtimeModule.getRuntimeInfo();
  res.render('beginner/runtime', { title: 'Runtime Architecture', info });
});

router.get('/modules', (req, res) => {
  const examples = modulesModule.getModuleExamples();
  res.render('beginner/modules', { title: 'Modules System', examples });
});

router.get('/event-loop', async (req, res) => {
  const demo = await eventLoopModule.runEventLoopDemo();
  res.render('beginner/event-loop', { title: 'Event Loop Basics', demo });
});

router.get('/fs', async (req, res) => {
  const examples = await fsModule.runFSExamples();
  res.render('beginner/fs', { title: 'File System Operations', examples });
});

router.get('/http', (req, res) => {
  res.render('beginner/http', { title: 'HTTP Server Basics' });
});

export default router;
