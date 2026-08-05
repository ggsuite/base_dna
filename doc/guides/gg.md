<!--
@license
Copyright (c) ggsuite

Use of this source code is governed by terms that can be
found in the LICENSE file in the root of this package.
-->

# Working with gg

`gg` is the one command line tool we use for our daily work. It is
**ticket driven**: you create a ticket, add the repositories the ticket
touches, and from then on every action runs across all repositories of
that ticket at once.

- [Install (once)](#install-once)
- [The four command groups](#the-four-command-groups)
- [A ticket from start to finish](#a-ticket-from-start-to-finish)
- [Command reference](#command-reference)
- [Rules of the house](#rules-of-the-house)

## Install (once)

```bash
dart pub global activate gg
```

Make sure `~/.pub-cache/bin` (Linux/macOS) or
`%LOCALAPPDATA%\Pub\Cache\bin` (Windows) is on your `PATH`, then check:

```bash
gg
```

The output lists the command groups; every level explains itself with
`-h`, for example `gg do -h` or `gg do create ticket -h`.

## The four command groups

| Group    | Purpose                                         |
| -------- | ----------------------------------------------- |
| `gg do`  | Act on all repos of the current ticket          |
| `gg can` | Check whether an action would succeed           |
| `gg did` | Check what you already did in the ticket        |
| `gg one` | Work in standalone repos — **we do not use it** |

The ocean is the folder that holds all organizations and repositories;
tickets live below it and reference the repos they touch.

## A ticket from start to finish

```bash
# 1. Create the ticket (folder + ticket data)
gg do create ticket -m "Add export button to the dashboard"

# 2. Enter the ticket folder and add the repos it touches
cd tickets/add-export-button
gg do add my_package my_other_package

# 3. Open all repos of the ticket in VS Code
gg do code

# 4. Change the code. Before committing, check everything:
#    analyze, format, tests and coverage in every ticket repo
gg can commit

# 5. Commit across all ticket repos (also writes the CHANGELOG entry)
gg do commit -m "Add export button to the dashboard"

# 6. Merge main into the ticket repos and push them
gg do push

# 7. Review, then publish
gg do review
gg do publish
```

`gg do <action>` runs the action in **every** ticket repo that has
changes — you never switch between repositories by hand.

## Command reference

```bash
# Tickets and workspace
gg do create ticket -m "<description>"  # create a ticket
gg do add <repo> [<repo> …]             # add repos to the ticket
gg do add --org <organization>          # add a whole organization
gg do rm <repo>                         # remove a repo or the ticket
gg do ls tickets                        # list tickets and descriptions
gg do ls repos | orgs | deps            # list the ocean's content
gg do init workspace                    # initialize the ocean
gg do init claude                       # create a ticket-level CLAUDE.md
gg do code                              # open the ticket in VS Code
gg do exec "<command>"                  # run a command in every repo
gg do upgrade                           # upgrade parts of the workspace
gg do import                            # import something into the ocean

# Daily flow
gg can commit | push | publish | review # checks only, changes nothing
gg do commit -m "<message>"             # commit after the checks pass
gg do push                              # merge main, then push
gg do review                            # start the code review
gg do publish                           # publish (do this deliberately)
gg did commit | push | review           # what happened already?
```

Inside a repository the usual Dart commands still apply:

```bash
dart pub get                           # get dependencies
dart test                              # run all tests
dart test test/path/to/file_test.dart  # run a single test file
```

## Rules of the house

- **Always commit and push through `gg`** (`gg do commit`, `gg do push`)
  — never with plain `git`, so the checks and the CHANGELOG entry are
  never skipped.
- **`gg can commit` failing is the point.** It fails when analysis,
  formatting, tests or the 100 % coverage requirement fail. Fix the
  cause, not the check.
- **We do not use `gg one`.** It exists for standalone repositories
  outside a ticket; our work is always ticket driven.
- When in doubt, ask the tool: `gg`, `gg do -h`, `gg can -h`.
