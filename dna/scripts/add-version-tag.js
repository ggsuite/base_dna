/*
 * @license
 * Copyright (c) dnaCopyrightHolder
 *
 * Use of this source code is governed by terms that can be
 * found in the LICENSE file in the root of this package.
 */

/**
 * Creates a git tag `v<version>` for the version found in package.json and
 * pushes it to `origin`.
 *
 * Preconditions: the repository must be clean and `main` must be up to date
 * with `origin/main`. Otherwise the script exits with code 1.
 *
 * Usage:
 *   node scripts/add-version-tag.js
 */

import { execSync } from 'child_process';
import { gray, green, red } from './functions/colors.js';
import { getVersion } from './functions/get-version.js';
import { isCleanMainBranch } from './functions/is-clean-repo.js';

const createVersionTag = (version) => {
  try {
    execSync(`git tag v${version}`);
    execSync(`git push origin v${version}`);
    console.log(green(`Tag v${version} created and pushed successfully.`));
  } catch (error) {
    console.error(
      red('Error creating or pushing tag\n'),
      gray(error.message.trim()),
    );
    process.exit(1);
  }
};

const main = async () => {
  if (!isCleanMainBranch()) {
    console.error(
      red('You must be on a clean main branch that is in sync with origin.'),
    );
    process.exit(1);
  }

  const version = await getVersion();
  createVersionTag(version);
};

main().catch((error) => {
  console.error(red(error.message));
  process.exit(1);
});
