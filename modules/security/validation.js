/**
 * Input Validation
 * WHY: Critical security - prevent injection attacks, data corruption
 */

/**
 * Validate and sanitize input
 * WHY: Shows basic validation patterns
 */
export function validateInput(input, rules) {
  const errors = [];
  
  if (rules.required && !input) {
    errors.push('Field is required');
  }
  
  if (rules.type === 'email' && input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input)) {
      errors.push('Invalid email format');
    }
  }
  
  if (rules.minLength && input && input.length < rules.minLength) {
    errors.push(`Minimum length is ${rules.minLength}`);
  }
  
  if (rules.maxLength && input && input.length > rules.maxLength) {
    errors.push(`Maximum length is ${rules.maxLength}`);
  }
  
  if (rules.pattern && input && !rules.pattern.test(input)) {
    errors.push('Invalid format');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Sanitize HTML to prevent XSS
 * WHY: EJS auto-escapes, but good to know
 */
export function sanitizeHtml(input) {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
