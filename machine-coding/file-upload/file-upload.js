/**
 * File Upload Service - Machine Coding Round
 * 
 * Requirements:
 * - Streaming upload
 * - Size limit enforcement
 * - Progress tracking
 * - Multiple file support
 * - File validation
 * 
 * Constraints:
 * - Use streams (memory efficient)
 * - Configurable size limits
 */

import { createWriteStream, createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * File Upload Handler
 * WHY: Demonstrates streaming, progress tracking, size limits
 */
export class FileUploadService {
  constructor(options = {}) {
    this.maxSize = options.maxSize || 10 * 1024 * 1024; // 10MB default
    this.allowedTypes = options.allowedTypes || [];
    this.uploadDir = options.uploadDir || join(__dirname, '../../uploads');
  }
  
  /**
   * Handle file upload with progress
   * WHY: Uses streams for memory efficiency
   */
  async uploadFile(fileStream, filename, onProgress) {
    let uploadedBytes = 0;
    
    // WHY: Track progress
    const progressStream = new (await import('stream')).Transform({
      transform(chunk, encoding, callback) {
        uploadedBytes += chunk.length;
        
        // WHY: Check size limit
        if (uploadedBytes > this.maxSize) {
          callback(new Error('File size exceeds limit'));
          return;
        }
        
        // WHY: Report progress
        if (onProgress) {
          onProgress({
            uploaded: uploadedBytes,
            total: this.maxSize,
            percentage: Math.min(100, (uploadedBytes / this.maxSize) * 100)
          });
        }
        
        callback(null, chunk);
      }
    });
    
    const filePath = join(this.uploadDir, filename);
    const writeStream = createWriteStream(filePath);
    
    try {
      // WHY: Pipeline handles backpressure automatically
      await pipeline(fileStream, progressStream, writeStream);
      
      return {
        success: true,
        filename,
        size: uploadedBytes,
        path: filePath
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  /**
   * Validate file
   * WHY: Check type, size before processing
   */
  validateFile(filename, size, mimetype) {
    const errors = [];
    
    if (size > this.maxSize) {
      errors.push(`File size ${size} exceeds limit ${this.maxSize}`);
    }
    
    if (this.allowedTypes.length > 0 && !this.allowedTypes.includes(mimetype)) {
      errors.push(`File type ${mimetype} not allowed`);
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
}
