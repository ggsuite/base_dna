<!--
@license
Copyright (c) dnaCopyrightHolder

Use of this source code is governed by terms that can be
found in the LICENSE file in the root of this package.
-->

# Working with gg and kd (Kidney)

Short guide: use `gg` for **single** repositories and `kd` (Kidney) for
**multiple** repositories across tickets.

- [Install (once)](#install-once)
- [What does what?](#what-does-what)
- [Example A — single repo ticket with gg](#example-a--single-repo-ticket-with-gg)
- [Example B — multi repo ticket with kd](#example-b--multi-repo-ticket-with-kd)
- [Command reference](#command-reference)
- [Workflow decision in five seconds](#workflow-decision-in-five-seconds)

## Install (once)

Both tools are Dart CLIs and are activated globally:

```bash
dart pub global activate gg
dart pub global activate kd
```

Make sure `~/.pub-cache/bin` (Linux/macOS) or
`%LOCALAPPDATA%\Pub\Cache\bin` (Windows) is on your `PATH`. Test:

```bash
gg -h
kd -h
```

## What does what?

| Tool | Purpose                                                                                              | Where to run                    |
| ---- | ---------------------------------------------------------------------------------------------------- | ------------------------------- |
| `gg` | Pre-commit checks (analyze, format, tests, coverage), commit, push, publish, ticket branch in **one** repo | In the repo folder              |
| `kd` | The same actions across **all** repos of a ticket, plus ticket and workspace management               | In the workspace or ticket folder |

Rule of thumb: **One repo affected → `gg`. Multiple repos → `kd`.**

## Example A — single repo ticket with gg

You want to fix a bug in `gg_dna`:

```bash
# 1. Enter the repo, get the latest state
cd <your-dev-folder>/gg_dna
git pull

# 2. Create a ticket branch (creates branch + .ticket file)
gg do create ticket -b fix-typo-readme -m "Fix typo in README headline"

# 3. Change the code, then commit
#    (gg first runs analyze + format + tests + coverage)
gg do commit -m "Fix typo in README headline"

# 4. Push
gg do push

# 5. Publish (only when the pubspec version was increased
#    and you want to publish)
gg do publish
```

**Important:** `gg do commit` fails when tests are red or coverage is below
100%. That is intended. Fix the cause, not the check.

Helpful:

- `gg can commit` / `gg can push` — check whether all conditions are met
  without doing anything
- `gg do upgrade` — updates all dependencies
- `gg -h` / `gg do -h` — complete command overview

## Example B — multi repo ticket with kd

You want to implement a feature that changes `kidney_core` and `kidney_ui`
together:

```bash
# 1. Enter the workspace
cd <your-workspace>

# 2. Create a ticket (creates ./tickets/<id>/ incl. .ticket file)
kd do create ticket add-export-button -m "Add export button to dashboard"

# 3. Enter the ticket folder
cd tickets/add-export-button

# 4. Add the required repos to the ticket
kd do add kidney_core kidney_ui

# 5. (Optional, recommended) Open all repos of the ticket in Vscode
kd do code

# 6. (Optional) Start Claude Code in the ticket workspace —
#    it sees all ticket repos
kd do claude

# 7. Change the code, then commit and push ticket wide
kd do commit -m "Add export button to dashboard"
kd do push

# 8. When done: review and publish
kd do review
kd do publish
```

`kd do <action>` runs the action in **every** ticket repo that has changes.
You no longer have to switch into each repo individually.

Helpful:

- `kd ls repos` — shows all repos of the master workspace
- `kd can commit` / `kd can push` — pre-check across all ticket repos
- `kd do execute "<command>"` — runs an arbitrary shell command in every
  ticket repo
- `kd one <gg-subcommand>` — runs a single `gg` subcommand in one ticket repo
- `kd -h` / `kd do -h` — complete command overview

## Command reference

These commands are available in the ticket workspace and in the single
repositories:

```bash
kd do add <repo> [<repo2> ...] # add repos to the ticket workspace by name
kd can commit                  # run all checks in all repos (analyze + format + tests)
kd do commit -m <message>      # commit in all repos after checks pass
kd can push                    # check for all repos if they are ready to push
kd do push                     # push in all repos after checks pass
kd do review                   # start code review in all repos
kd do cancel-review            # cancel code review in all repos and return to work
kd do publish                  # publish all repos after review is approved
                               # (should be executed manually by a human)
```

The following commands are only available inside the repositories of the
ticket workspace:

### gg commands (gg is often used by kd commands)

```bash
gg check analyze                 # static analysis
gg check format                  # formatting check
gg can commit                    # run all checks (analyze + format + tests)
gg do commit -m <message>        # commit after checks pass
gg do push                       # push after checks pass
```

### Testing

```bash
dart test                              # run all tests
dart test test/path/to/file_test.dart  # run a single test file
```

### Get dependencies

```bash
dart pub get
```

For committing, always use `gg do commit` or `kd do commit`.
For pushing, always use `gg do push` or `kd do push`.

## Workflow decision in five seconds

```text
Does the change affect only one repo?
 ├─ Yes → cd <repo>      → gg do create ticket / commit / push
 └─ No  → cd <workspace> → kd do create ticket → kd do add ... → kd do commit / push
```

More details: `gg -h`, `kd -h`, or the READMEs of the `gg` and `kidney_core`
repositories.
