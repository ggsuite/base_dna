/*
 * @license
 * Copyright (c) dnaCopyrightHolder
 *
 * Use of this source code is governed by terms that can be
 * found in the LICENSE file in the root of this package.
 */

/**
 * Checks whether the Azure CLI (`az`) is available on the current machine.
 *
 * Usage:
 *   import { azIsInstalled } from './functions/az-is-installed.js';
 *
 *   if (!azIsInstalled()) {
 *     console.error(red('Please install the Azure CLI: https://aka.ms/azure-cli'));
 *     process.exit(1);
 *   }
 *
 * @returns {boolean} true when `az` can be executed, false otherwise
 */

import { execSync } from 'child_process';
import { blue, gray, red, yellow } from './colors.js';

export const azIsInstalled = () => {
  try {
    execSync('az --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};

/**
 * Makes sure the Azure CLI (`az`) is installed. Prints installation help and
 * throws when it is not.
 *
 * Usage:
 *   import { expectAzInstalled } from './functions/az-is-installed.js';
 *
 *   expectAzInstalled();
 *
 * @throws {Error} when `az` is not installed
 */
export const expectAzInstalled = () => {
  if (azIsInstalled()) {
    return;
  }

  console.error(red('❌ The Azure CLI (az) is not installed.'));
  console.error(yellow('Please install it and try again:'));
  console.error(gray('  macOS:   ') + blue('brew install azure-cli'));
  console.error(
    gray('  Linux:   ') +
      blue('curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash'),
  );
  console.error(
    gray('  Windows: ') + blue('winget install --id Microsoft.AzureCLI'),
  );
  console.error(gray('  Docs:    ') + blue('https://aka.ms/azure-cli'));
  console.error(
    yellow('Afterwards log in using ') + blue('az login') + yellow('.'),
  );

  throw new Error('az is not installed');
};
