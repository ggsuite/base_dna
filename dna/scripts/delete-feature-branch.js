/*
 * @license
 * Copyright (c) ggsuite
 *
 * Use of this source code is governed by terms that can be
 * found in the LICENSE file in the root of this package.
 */

/**
 * Deletes the current feature branch after its changes have landed on `main`.
 *
 * The script refuses to continue when it is called on `main`, when there are
 * uncommitted changes, or when there are unpushed commits. It then updates
 * `main` and performs a test merge to find out whether the feature branch is
 * effectively merged. Only then the branch is deleted; otherwise the script
 * switches back to the feature branch and asks for a pull request.
 *
 * Usage:
 *   node scripts/delete-feature-branch.js
 */

import { gray, green, red, yellow } from './functions/colors.js';
import { runCommand } from './functions/run-command.js';

// Check for uncommitted changes
function hasUncommittedChanges() {
  console.log(gray('Check for uncommitted changes'));
  const status = runCommand('git status --porcelain');
  return status.length > 0;
}

// Check for unpushed commits
function hasUnpushedCommits(branch) {
  try {
    console.log(gray('Check for unpushed commits'));
    runCommand(`git rev-parse --abbrev-ref ${branch}@{u}`);
    const ahead = runCommand(`git rev-list --count ${branch}@{u}..${branch}`);
    return parseInt(ahead, 10) > 0;
  } catch {
    return true;
  }
}

// Abort a running merge. Does nothing when no merge is in progress, because
// 'git merge --abort' fails in that case.
function abortMergeIfAny() {
  try {
    runCommand('git rev-parse --verify --quiet MERGE_HEAD');
  } catch {
    return; // No merge in progress
  }

  try {
    runCommand('git merge --abort');
  } catch {}
}

// True when all commits of the branch are already contained in main
function isAncestorOfMain(featureBranch) {
  try {
    runCommand(`git merge-base --is-ancestor ${featureBranch} main`);
    return true;
  } catch {
    return false;
  }
}

// Check if the branch has landed on main, either as a merge commit or squashed
function isBranchEffectivelyMerged(featureBranch) {
  console.log(gray('Check if feature was fully merged'));

  // Merge commit or fast forward: the commits themselves are part of main.
  // A test merge would report 'Already up to date' and leave no merge to
  // abort, so this case has to be checked first.
  if (isAncestorOfMain(featureBranch)) {
    return true;
  }

  // Squash merge: the commits are not part of main, but their changes are.
  // A test merge therefore introduces no changes.
  try {
    runCommand(`git merge --no-commit --no-ff ${featureBranch}`);
    const changed = hasUncommittedChanges();
    abortMergeIfAny();
    return !changed;
  } catch {
    abortMergeIfAny();
    return false;
  }
}

try {
  console.log(gray('Get current branch name'));
  const currentBranch = runCommand('git rev-parse --abbrev-ref HEAD');

  if (currentBranch === 'main') {
    console.log(yellow('Please call this script from a feature branch.'));
    process.exit(0);
  }

  if (hasUncommittedChanges()) {
    console.error(red('❌ You have uncommitted changes.'));
    console.error(
      yellow('Please commit or stash your changes before continuing.'),
    );
    process.exit(1);
  }

  if (hasUnpushedCommits(currentBranch)) {
    console.error(red('❌ You have unpushed commits.'));
    console.error(yellow('Please push your branch before continuing.'));
    process.exit(1);
  }

  console.log(gray(`Fetching and pulling 'main'...`));
  runCommand('git fetch');
  runCommand('git checkout main');
  runCommand('git pull origin main');

  const isMerged = isBranchEffectivelyMerged(currentBranch);

  if (isMerged) {
    try {
      runCommand(`git branch -d ${currentBranch}`);
    } catch {
      // Squash merged branches are not 'merged' in git's own sense, so -d
      // refuses to delete them. We have verified above that the changes are
      // on main, therefore forcing the deletion is safe here.
      runCommand(`git branch -D ${currentBranch}`);
    }
    console.log(green(`✅ Branch '${currentBranch}' has been deleted.`));
  } else {
    console.error(
      red(`❌ Branch '${currentBranch}' is not merged into 'main'.`),
    );
    console.log(
      yellow(`Please (create and) merge a pull request and try again.`),
    );
    runCommand(`git checkout ${currentBranch}`);
    console.log(gray(`Switched back to '${currentBranch}'.`));
  }
} catch (error) {
  console.error(red(`Error: ${error.message}`));
  abortMergeIfAny();
  process.exit(1);
}
