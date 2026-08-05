<!--
@license
Copyright (c) dnaCopyrightHolder

Use of this source code is governed by terms that can be
found in the LICENSE file in the root of this package.
-->

# Prepare

- [Install tools](#install-tools)
- [Get access](#get-access)
- [Open the project the first time](#open-the-project-the-first-time)

## Install tools

Install the tools you need for your platform and project:

- [Install Vscode](./install-vscode.md)
- [Install Brew on Mac](./install-brew-on-mac.md)
- [Install Node on Mac](./install-node-mac.md)
- [Install Node on Windows](./install-node-win.md)
- [Install corepack and pnpm](./install-corepack.md)
- [Install the GitHub CLI](./install-github-cli.md)
- [Install Flutter](./install-flutter.md)
- [Install gg](./install-gg.md)

Optional, depending on your project:

- [Install WSL and Ubuntu](./install-wsl-and-ubuntu.md) (Windows)
- [Install Docker on Ubuntu](./install-docker-ubuntu.md)
- [Install SQL Server](./install-sql-server.md)

## Get access

- [Get access to GitHub](./get-access-to-github.md)
- [Get access to NPM](./get-access-to-npm.md)

## Open the project the first time

### Create a development folder

Our organization consists of multiple repos, so we recommend checking out
all projects into one development folder, e.g. `~/dev`:

```bash
mkdir -p ~/dev
cd ~/dev
```

### Clone the code

Open <dnaOrgUrl>, pick your repository and clone it:

```bash
git clone git@github.com:dnaCompany/my-repo.git
cd my-repo
```

### Configure email address and user name

Replace `first` and `last` by your first and last name and execute:

```bash
git config --global user.name "first last"
```

Replace `email` by your email and execute:

```bash
git config --global user.email "email"
```

### Open the project with Vscode

```bash
code .
```

### Install recommended extensions

When opening the project the first time, you will be asked to install the
recommended workspace extensions. Click on `Install`.

If you do not see this step:

Press `Ctrl+Shift+P`.

Type `Extensions: Show Recommended Extensions` and press `Enter`.

The recommended extensions will be shown.

Make sure all recommended extensions are installed.

### Continue with the ticket workflow

Read [develop.md](./develop.md) to learn how we develop and ship changes.
