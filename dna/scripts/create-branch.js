/*
 * @license
 * Copyright (c) dnaCopyrightHolder
 *
 * Use of this source code is governed by terms that can be
 * found in the LICENSE file in the root of this package.
 */

/**
 * Creates and checks out a new git branch. All arguments are joined and
 * converted to kebab-case, so a branch can be described in plain words.
 *
 * Usage:
 *   node scripts/create-branch.js <branch description...>
 *
 * Example:
 *   node scripts/create-branch.js Add Version Tag   # -> add-version-tag
 */

import { blue, green, red } from './functions/colors.js';
import { runCommand } from './functions/run-command.js';

// Converts a string to kebab-case
function toKebabCase(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with dashes
    .replace(/^-+|-+$/g, ''); // Remove leading or trailing dashes
}

// Get command line arguments
const input = process.argv.slice(2).join(' ');

if (!input) {
  console.error(red('Please provide a branch name.'));
  process.exit(1);
}

const kebabCaseName = toKebabCase(input);

try {
  // Create new Git branch
  runCommand(`git checkout -b ${kebabCaseName}`);
  console.log('✅ ' + green('Created new branch: ') + blue(kebabCaseName));
} catch (error) {
  console.error(red('Failed to create branch: ' + error.message));
  process.exit(1);
}
