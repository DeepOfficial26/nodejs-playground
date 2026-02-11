/**
 * Cluster Module
 * WHY: Enables multi-core utilization - critical for production
 * 
 * Cluster allows:
 * - Multiple worker processes
 * - Shared server port
 * - Process management
 * - Zero-downtime restarts
 */

import cluster from 'cluster';
import os from 'os';

/**
 * Get cluster information
 * WHY: Shows how cluster works
 */
export function getClusterInfo() {
  return {
    isMaster: cluster.isPrimary,
    isWorker: cluster.isWorker,
    workers: Object.keys(cluster.workers || {}).length,
    cpuCount: os.cpus().length,
    explanation: {
      primary: 'Main process that manages workers',
      worker: 'Child process that handles requests',
      benefit: 'Utilize all CPU cores for better performance'
    },
    keyPoints: [
      'Cluster creates worker processes',
      'Workers share server port',
      'Primary process manages workers',
      'Workers are independent (can crash without affecting others)',
      'Useful for CPU-bound or I/O-bound apps'
    ]
  };
}
