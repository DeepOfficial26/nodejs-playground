/**
 * Advanced Level Routes
 * WHY: Demonstrates Node.js internals, performance, and advanced patterns
 */

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

import * as eventLoopPhasesModule from '../modules/advanced/event-loop-phases.js';
import * as workersModule from '../modules/advanced/workers.js';
import * as clusterModule from '../modules/advanced/cluster.js';
import * as shutdownModule from '../modules/advanced/graceful-shutdown.js';

router.get('/', (req, res) => {
  res.render('advanced/index', {
    title: 'Advanced Level - Internals & Performance',
    topics: [
      { name: 'Event Loop Phases', path: '/advanced/event-loop-phases', description: 'Timers, poll, check, close' },
      { name: 'Workers', path: '/advanced/workers', description: 'worker_threads vs child_process' },
      { name: 'Cluster', path: '/advanced/cluster', description: 'Multi-core processing' },
      { name: 'Graceful Shutdown', path: '/advanced/shutdown', description: 'Process lifecycle management' }
    ]
  });
});

router.get('/event-loop-phases', async (req, res) => {
  const demo = await eventLoopPhasesModule.runPhasesDemo();
  res.render('advanced/event-loop-phases', { title: 'Event Loop Phases', demo });
});

router.get('/workers', async (req, res) => {
  const comparison = await workersModule.runWorkersComparison();
  res.render('advanced/workers', { title: 'Workers Comparison', comparison });
});

router.get('/cluster', (req, res) => {
  res.render('advanced/cluster', { title: 'Cluster Mode' });
});

router.get('/shutdown', (req, res) => {
  res.render('advanced/shutdown', { title: 'Graceful Shutdown' });
});

export default router;
