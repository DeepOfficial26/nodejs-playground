/**
 * File System Operations
 * WHY: fs module is fundamental - shows sync vs async, streams
 */

import fs from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Demonstrate various fs operations
 * WHY: Shows async file operations, error handling
 */
export async function runFSExamples() {
  const examples = [];
  const testDir = join(__dirname, '../../temp');
  const testFile = join(testDir, 'test.txt');
  
  try {
    // Create directory if it doesn't exist
    if (!existsSync(testDir)) {
      await fs.mkdir(testDir, { recursive: true });
      examples.push({ operation: 'mkdir', result: 'Directory created' });
    }
    
    // Write file (async)
    await fs.writeFile(testFile, 'Hello Node.js!\nThis is a test file.', 'utf8');
    examples.push({ operation: 'writeFile', result: 'File written asynchronously' });
    
    // Read file (async)
    const content = await fs.readFile(testFile, 'utf8');
    examples.push({ operation: 'readFile', result: `Content: ${content.substring(0, 50)}...` });
    
    // Get file stats
    const stats = await fs.stat(testFile);
    examples.push({ 
      operation: 'stat', 
      result: {
        size: stats.size,
        isFile: stats.isFile(),
        isDirectory: stats.isDirectory(),
        createdAt: stats.birthtime,
        modifiedAt: stats.mtime
      }
    });
    
    // Read directory
    const files = await fs.readdir(testDir);
    examples.push({ operation: 'readdir', result: `Files: ${files.join(', ')}` });
    
    // Clean up
    await fs.unlink(testFile);
    examples.push({ operation: 'unlink', result: 'File deleted' });
    
  } catch (error) {
    examples.push({ operation: 'error', result: error.message });
  }
  
  return {
    examples,
    keyPoints: [
      'fs/promises provides async/await API',
      'Always handle errors with try/catch',
      'Use fs.existsSync() for sync checks',
      'Streams are better for large files',
      'fs operations are non-blocking (use thread pool)'
    ]
  };
}
