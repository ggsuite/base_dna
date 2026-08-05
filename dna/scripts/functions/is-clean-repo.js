/*
 * @license
 * Copyright (c) dnaCopyrightHolder
 *
 * Use of this source code is governed by terms that can be
 * found in the LICENSE file in the root of this package.
 */

import { execSync } from 'child_process';

/**
 * True when the working directory has no uncommitted changes.
 *
 * @param {string} [path] repository to check, defaults to the current directory
 * @returns {boolean}
 */
export function isCleanRepo(path) {
  const cwd = path ?? '.';

  try {
    const status = execSync('git status --porcelain', { cwd })
      .toString()
      .trim();

    return status.length === 0;
  } catch (err) {
    console.error('Git error:', err.message);
    return false;
  }
}

/**
 * True when we are on a clean `main` branch that is in sync with
 * `origin/main` — the precondition for releasing.
 *
 * Performs a `git fetch`.
 *
 * @param {string} [path] repository to check, defaults to the current directory
 * @returns {boolean}
 */
export function isCleanMainBranch(path) {
  const cwd = path ?? '.';

  try {
    // Determine the current branch
    const branch = execSync('git rev-parse --abbrev-ref HEAD', {
      cwd,
    })
      .toString()
      .trim();
    if (branch !== 'main') {
      return false;
    }

    if (!isCleanRepo(cwd)) {
      return false;
    }

    // Run git fetch (silently)
    execSync('git fetch', { stdio: 'ignore', cwd });

    // Check whether main is up to date with origin/main
    const revList = execSync(
      'git rev-list --left-right --count origin/main...main',
      { cwd },
    )
      .toString()
      .trim();

    const [behind, ahead] = revList.split('\t').map(Number);
    return behind === 0 && ahead === 0;
  } catch (err) {
    console.error('Git error:', err.message);
    return false;
  }
}
