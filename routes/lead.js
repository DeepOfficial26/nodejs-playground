/**
 * Lead/Architect Level Routes
 * WHY: Demonstrates system design, scaling, and architectural patterns
 */

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.get('/', (req, res) => {
  res.render('lead/index', {
    title: 'Lead/Architect Level - System Design',
    topics: [
      { name: 'Scaling Strategies', path: '/lead/scaling', description: 'Horizontal vs vertical scaling' },
      { name: 'Load Balancing', path: '/lead/load-balancing', description: 'Load balancing strategies' },
      { name: 'Circuit Breaker', path: '/lead/circuit-breaker', description: 'Resilience patterns' },
      { name: 'Observability', path: '/lead/observability', description: 'Logs, metrics, tracing' }
    ]
  });
});

router.get('/scaling', (req, res) => {
  res.render('lead/scaling', { title: 'Scaling Strategies' });
});

router.get('/load-balancing', (req, res) => {
  res.render('lead/load-balancing', { title: 'Load Balancing' });
});

router.get('/circuit-breaker', (req, res) => {
  res.render('lead/circuit-breaker', { title: 'Circuit Breaker Pattern' });
});

router.get('/observability', (req, res) => {
  res.render('lead/observability', { title: 'Observability' });
});

export default router;
