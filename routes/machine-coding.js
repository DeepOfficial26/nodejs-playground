/**
 * Machine Coding Round Routes
 * WHY: Demonstrates backend system implementations for interviews
 */

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.get('/', (req, res) => {
  res.render('machine-coding/index', {
    title: 'Machine Coding Rounds',
    scenarios: [
      { name: 'Rate Limiter', path: '/machine-coding/rate-limiter', description: 'Token bucket & sliding window' },
      { name: 'Job Queue', path: '/machine-coding/job-queue', description: 'In-memory queue with retry' },
      { name: 'File Upload', path: '/machine-coding/file-upload', description: 'Streaming upload service' },
      { name: 'Chat Server', path: '/machine-coding/chat', description: 'WebSocket-based chat' },
      { name: 'API Gateway', path: '/machine-coding/api-gateway', description: 'Proxy with rate limiting' },
      { name: 'LRU Cache', path: '/machine-coding/lru-cache', description: 'Least Recently Used cache' },
      { name: 'Pub-Sub System', path: '/machine-coding/pub-sub', description: 'Publisher-subscriber pattern' }
    ]
  });
});

router.get('/rate-limiter', (req, res) => {
  res.render('machine-coding/rate-limiter', { title: 'Rate Limiter' });
});

router.get('/job-queue', (req, res) => {
  res.render('machine-coding/job-queue', { title: 'Job Queue' });
});

router.get('/file-upload', (req, res) => {
  res.render('machine-coding/file-upload', { title: 'File Upload Service' });
});

router.get('/chat', (req, res) => {
  res.render('machine-coding/chat', { title: 'Chat Server' });
});

router.get('/api-gateway', (req, res) => {
  res.render('machine-coding/api-gateway', { title: 'API Gateway' });
});

router.get('/lru-cache', (req, res) => {
  res.render('machine-coding/lru-cache', { title: 'LRU Cache' });
});

router.get('/pub-sub', (req, res) => {
  res.render('machine-coding/pub-sub', { title: 'Pub-Sub System' });
});

export default router;
