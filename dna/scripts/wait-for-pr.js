/*
 * @license
 * Copyright (c) ggsuite
 *
 * Use of this source code is governed by terms that can be
 * found in the LICENSE file in the root of this package.
 */

/**
 * Prints the URL of the pull request of the current branch and then blocks
 * until that pull request is merged or closed, polling every two seconds. If
 * the CI pipeline reports a failure in the meantime, the script exits with
 * code 1.
 *
 * Requires the GitHub CLI (`gh`) to be installed and authenticated.
 *
 * Usage:
 *   node scripts/wait-for-pr.js
 */

import { blue, green, red, yellow } from './functions/colors.js';
import { expectGhInstalled } from './functions/gh_is_installed.js';
import { runCommand } from './functions/run-command.js';

function getPRUrl() {
  try {
    const json = runCommand('gh pr view --json url').trim();

    const parsed = JSON.parse(json);
    const url = parsed.url;
    console.log(blue(url));
  } catch (error) {
    console.error(yellow('No PR available'));
    process.exit(1);
  }
}

function getPRStatus() {
  try {
    const jsonString = runCommand(
      'gh pr view --json state',
      true,
      false,
    ).trim();

    const jsonParsed = JSON.parse(jsonString);
    return jsonParsed.state;
  } catch (error) {
    console.error(red('Error fetching PR status'));
    process.exit(1);
  }
}

async function checkIfPipelineHasFailed() {
  try {
    const json = runCommand(
      'gh run list --limit 1 --json status,conclusion',
      true,
      false,
    ).trim();

    const jsonParsed = JSON.parse(json);
    if (jsonParsed.length) {
      if (jsonParsed[0].conclusion === 'failure') {
        console.error(red('Pipeline has failed. Please fix.'));
        process.exit(1);
      }
    }
  } catch (e) {
    console.error(red('Error fetching pipeline status'));
    process.exit(1);
  }
}

// Give up after this many milliseconds, so the script cannot block a CI job
// forever. Override with WAIT_FOR_PR_TIMEOUT_MS.
const timeoutMs = Number(process.env.WAIT_FOR_PR_TIMEOUT_MS ?? 2 * 60 * 60_000);

async function waitForPRClosure() {
  console.log(yellow('Wait for pipelines, code review and merge ...'));

  const deadline = Date.now() + timeoutMs;

  while (true) {
    if (Date.now() > deadline) {
      console.error(
        red(`Timeout: PR was not closed within ${timeoutMs / 60_000} minutes.`),
      );
      process.exit(1);
    }

    const status = getPRStatus();

    if (status === 'MERGED') {
      console.log(green('PR has been merged.'));
      break;
    } else if (status === 'CLOSED') {
      console.log(green('PR has been closed.'));
      break;
    }

    await checkIfPipelineHasFailed();

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}

async function main() {
  try {
    expectGhInstalled();
  } catch {
    process.exit(1);
  }

  getPRUrl();
  await waitForPRClosure();
}

main();
