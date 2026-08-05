/*
 * @license
 * Copyright (c) dnaCopyrightHolder
 *
 * Use of this source code is governed by terms that can be
 * found in the LICENSE file in the root of this package.
 */

/**
 * Checks whether the GitHub CLI (`gh`) is available on the current machine.
 *
 * Usage:
 *   import { ghIsInstalled } from './functions/gh-is-installed.js';
 *
 *   if (!ghIsInstalled()) {
 *     console.error(red('Please install the GitHub CLI: https://cli.github.com'));
 *     process.exit(1);
 *   }
 *
 * @returns {boolean} true when `gh` can be executed, false otherwise
 */

import { execSync } from 'child_process';
import { blue, gray, red, yellow } from './colors.js';

export const ghIsInstalled = () => {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};

/**
 * Makes sure the GitHub CLI (`gh`) is installed. Prints installation help and
 * throws when it is not.
 *
 * Usage:
 *   import { expectGhInstalled } from './functions/gh-is-installed.js';
 *
 *   expectGhInstalled();
 *
 * @throws {Error} when `gh` is not installed
 */
export const expectGhInstalled = () => {
  if (ghIsInstalled()) {
    return;
  }

  console.error(red('❌ The GitHub CLI (gh) is not installed.'));
  console.error(yellow('Please install it and try again:'));
  console.error(gray('  macOS:   ') + blue('brew install gh'));
  console.error(gray('  Linux:   ') + blue('sudo apt install gh'));
  console.error(gray('  Windows: ') + blue('winget install --id GitHub.cli'));
  console.error(gray('  Docs:    ') + blue('https://cli.github.com'));
  console.error(
    yellow('Afterwards log in using ') + blue('gh auth login') + yellow('.'),
  );

  throw new Error('gh is not installed');
};
