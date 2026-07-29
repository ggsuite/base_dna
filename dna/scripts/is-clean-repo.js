/*
 * @license
 * Copyright (c) ggsuite
 *
 * Use of this source code is governed by terms that can be
 * found in the LICENSE file in the root of this package.
 */

/**
 * Prints whether the current repository has no uncommitted changes.
 *
 * Usage:
 *   node scripts/is-clean-repo.js   # -> "✅ clean" or "❌ dirty"
 */

import { isCleanRepo } from './functions/is-clean-repo.js';

console.log(isCleanRepo() ? '✅ clean' : '❌ dirty');
