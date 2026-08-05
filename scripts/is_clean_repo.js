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
 *   node scripts/is_clean_repo.js   # -> "✅ clean" or "❌ dirty"
 */

import { isCleanRepo } from './functions/is_clean_repo.js';

console.log(isCleanRepo() ? '✅ clean' : '❌ dirty');
