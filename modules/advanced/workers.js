/**
 * Workers - worker_threads vs child_process
 * WHY: Understanding when to use workers is critical for CPU-bound tasks
 * 
 * worker_threads: Shared memory, lightweight, same process
 * child_process: Separate process, isolated, heavier
 */

import { Worker } from 'worker_threads';
import { fork } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Compare worker_threads vs child_process
 * WHY: Shows when to use each
 */
export async function runWorkersComparison() {
  return {
    workerThreads: {
      useCase: 'CPU-bound tasks in same process',
      pros: [
        'Shared memory (SharedArrayBuffer)',
        'Lightweight',
        'Fast communication',
        'Same process'
      ],
      cons: [
        'If worker crashes, can affect main process',
        'Limited isolation'
      ],
      example: 'Image processing, data parsing'
    },
    childProcess: {
      useCase: 'Separate processes, isolation needed',
      pros: [
        'Complete isolation',
        'Crash doesn\'t affect main process',
        'Can run different Node.js versions',
        'Better for long-running tasks'
      ],
      cons: [
        'Heavier (separate V8 instance)',
        'Slower communication (IPC)',
        'More memory usage'
      ],
      example: 'Microservices, separate apps'
    },
    whenToUse: {
      workerThreads: [
        'CPU-intensive tasks',
        'Need shared memory',
        'Fast communication needed',
        'Same Node.js version'
      ],
      childProcess: [
        'Need process isolation',
        'Different Node.js versions',
        'Long-running separate services',
        'Crash isolation critical'
      ]
    }
  };
}
