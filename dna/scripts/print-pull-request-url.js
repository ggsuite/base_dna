/*
 * @license
 * Copyright (c) dnaCopyrightHolder
 *
 * Use of this source code is governed by terms that can be
 * found in the LICENSE file in the root of this package.
 */

/**
 * Prints the URL of the pull request belonging to the current branch. Exits
 * with code 1 when no pull request exists.
 *
 * Requires the GitHub CLI (`gh`) to be installed and authenticated.
 *
 * Usage:
 *   node scripts/print-pull-request-url.js
 */

import { blue, red } from './functions/colors.js';
import { expectGhInstalled } from './functions/gh-is-installed.js';
import { pullRequestUrl } from './functions/pull-request-url.js';

function getPullRequestUrl() {
  try {
    const url = pullRequestUrl();
    console.log(blue(url));
  } catch (error) {
    console.error(red('No PR available'));
    process.exit(1);
  }
}

function main() {
  try {
    expectGhInstalled();
  } catch {
    process.exit(1);
  }

  getPullRequestUrl();
}

main();
