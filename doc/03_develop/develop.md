<!--
@license
Copyright (c) ggsuite

Use of this source code is governed by terms that can be
found in the LICENSE file in the root of this package.
-->

# Ticket workflow

- [Checkout main](#checkout-main)
- [Set pull request title](#set-pull-request-title)
- [Create a feature branch](#create-a-feature-branch)
- [Update dependencies](#update-dependencies)
- [Develop \& debug](#develop--debug)
- [Commit](#commit)
- [Increase version](#increase-version)
- [Run tests and build](#run-tests-and-build)
- [Rebase main](#rebase-main)
- [Push changes](#push-changes)
- [Create a pull request](#create-a-pull-request)
- [Code review](#code-review)
- [Checkout main and delete feature branch](#checkout-main-and-delete-feature-branch)
- [Publish](#publish)

## Checkout main

```bash
git checkout main
git fetch
git pull
```

## Set pull request title

In all steps below, replace the placeholder title
My pull request by the title of your pull request.

## Create a feature branch

```bash
node scripts/create_branch.js "My pull request"
```

## Update dependencies

Update the dependencies of the project with the package manager of your
ecosystem.

## Develop & debug

- [Vscode tips](./vscode_tips.md)
- [Rename classes](./rename_classes.md)
- [Working with gg](./guides/gg.md)

## Commit

Use Vscode or another git client to commit your changes.

If you have only one change, run

```bash
git add .
git commit -am"My pull request"
```

## Increase version

Increase the version in the package manifest of your ecosystem
(e.g. `package.json` or `pubspec.yaml`) and commit:

```bash
git commit -am"Increase version"
```

## Run tests and build

Run the tests and the build of your ecosystem and make sure they pass.

## Rebase main

```bash
git rebase main
```

## Push changes

```bash
git push -u origin HEAD
```

## Create a pull request

```bash
gh pr create --base main --title "My pull request" --body " "
```

## Code review

You need a code review? Read [code-review.md](./code-review.md).

If you don't require a code review, auto merge the branch

```bash
gh pr merge --auto --squash
node scripts/wait_for_pr.js
```

## Checkout main and delete feature branch

```bash
node scripts/delete_feature_branch.js
```

## Publish

Publish the new version with the publish workflow of your ecosystem.
