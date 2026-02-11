/**
 * Security & Reliability Routes
 * WHY: Demonstrates security best practices and error handling
 */

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

import * as rateLimitModule from '../modules/security/rate-limiting.js';
import * as validationModule from '../modules/security/validation.js';
import * as errorHandlingModule from '../modules/security/error-handling.js';

router.get('/', (req, res) => {
  res.render('security/index', {
    title: 'Security & Reliability',
    topics: [
      { name: 'Rate Limiting', path: '/security/rate-limiting', description: 'Protect against abuse' },
      { name: 'Input Validation', path: '/security/validation', description: 'Sanitize user input' },
      { name: 'Error Handling', path: '/security/error-handling', description: 'uncaughtException vs unhandledRejection' }
    ]
  });
});

router.get('/rate-limiting', (req, res) => {
  res.render('security/rate-limiting', { title: 'Rate Limiting' });
});

router.get('/validation', (req, res) => {
  res.render('security/validation', { title: 'Input Validation' });
});

router.get('/error-handling', (req, res) => {
  res.render('security/error-handling', { title: 'Error Handling' });
});

export default router;
