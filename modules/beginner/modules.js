/**
 * Modules System - CommonJS vs ES Modules
 * WHY: Understanding module systems is crucial for Node.js architecture
 * 
 * Key Differences:
 * - CommonJS: require/module.exports (synchronous, runtime)
 * - ES Modules: import/export (static, compile-time)
 */

/**
 * Demonstrate CommonJS behavior
 * WHY: Shows how CommonJS works (even though we're using ESM)
 */
export function getModuleExamples() {
  return {
    commonjs: {
      syntax: `
        // CommonJS
        const fs = require('fs');
        module.exports = { readFile };
      `,
      characteristics: [
        'Synchronous loading',
        'Runtime resolution',
        'Dynamic require()',
        'module.exports / exports'
      ]
    },
    esModules: {
      syntax: `
        // ES Modules
        import fs from 'fs';
        export { readFile };
      `,
      characteristics: [
        'Static analysis',
        'Compile-time resolution',
        'Top-level await',
        'Tree-shaking support',
        'Better for bundlers'
      ]
    },
    whenToUse: {
      commonjs: [
        'Legacy codebases',
        'Dynamic imports needed',
        'Conditional module loading'
      ],
      esModules: [
        'Modern Node.js (14.8+)',
        'Better performance',
        'Static analysis tools',
        'Browser compatibility'
      ]
    }
  };
}
