/*
 * @license
 * Copyright (c) ggsuite
 *
 * Use of this source code is governed by terms that can be
 * found in the LICENSE file in the root of this package.
 */

// checkRepo.js
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
    // Aktuellen Branch ermitteln
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

    // Git-Fetch ausführen (still)
    execSync('git fetch', { stdio: 'ignore', cwd });

    // Prüfen, ob main auf dem neuesten Stand mit origin/main ist
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
