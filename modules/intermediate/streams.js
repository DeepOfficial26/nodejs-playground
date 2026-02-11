/**
 * Streams & Buffers
 * WHY: Streams are essential for handling large data efficiently
 * 
 * Types:
 * - Readable: Read data (fs.createReadStream)
 * - Writable: Write data (fs.createWriteStream)
 * - Duplex: Both read and write (net.Socket)
 * - Transform: Modify data (zlib.createGzip)
 */

import { Readable, Writable, Transform } from 'stream';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Demonstrate streams
 * WHY: Shows memory-efficient data processing
 */
export async function runStreamsDemo() {
  const examples = [];
  
  // WHY: Create a readable stream
  const readable = new Readable({
    read() {
      this.push('Hello ');
      this.push('Streams!');
      this.push(null); // End stream
    }
  });
  
  // WHY: Create a transform stream
  const transform = new Transform({
    transform(chunk, encoding, callback) {
      this.push(chunk.toString().toUpperCase());
      callback();
    }
  });
  
  // WHY: Create a writable stream
  const chunks = [];
  const writable = new Writable({
    write(chunk, encoding, callback) {
      chunks.push(chunk.toString());
      callback();
    }
  });
  
  // WHY: Pipeline handles backpressure automatically
  await pipeline(readable, transform, writable);
  
  examples.push({
    type: 'Basic Streams',
    result: chunks.join(''),
    explanation: 'Readable -> Transform -> Writable'
  });
  
  return {
    examples,
    keyPoints: [
      'Streams handle data in chunks (not all at once)',
      'Backpressure: slow consumers pause fast producers',
      'Memory efficient for large files',
      'pipeline() handles errors and cleanup',
      'Use streams for: file I/O, HTTP requests, data processing'
    ]
  };
}

/**
 * Demonstrate buffer operations
 * WHY: Buffers are Node.js way of handling binary data
 */
export function demonstrateBuffers() {
  // WHY: Create buffers
  const buf1 = Buffer.from('Hello');
  const buf2 = Buffer.from(' World');
  
  // WHY: Concatenate buffers
  const combined = Buffer.concat([buf1, buf2]);
  
  return {
    buffers: {
      buf1: buf1.toString(),
      buf2: buf2.toString(),
      combined: combined.toString()
    },
    sizes: {
      buf1: buf1.length,
      buf2: buf2.length,
      combined: combined.length
    },
    explanation: 'Buffers handle binary data efficiently'
  };
}
