<!--
@license
Copyright (c) ggsuite

Use of this source code is governed by terms that can be
found in the LICENSE file in the root of this package.
-->

# Prepare

- [Install tools](#install-tools)
- [Get access](#get-access)
- [Open the project the first time](#open-the-project-the-first-time)

## Install tools

Install the tools you need for your platform and project:

- [Install Vscode](./install_vscode.md)
- [Install Brew on Mac](./install_brew_on_mac.md)
- [Install Node on Mac](./install_node_mac.md)
- [Install Node on Windows](./install_node_win.md)
- [Install corepack and pnpm](./install_corepack.md)
- [Install the GitHub CLI](./install_github_cli.md)
- [Install Flutter](./install_flutter.md)
- [Install gg](./install_gg.md)

Optional, depending on your project:

- [Install WSL and Ubuntu](./install_wsl_and_ubuntu.md) (Windows)
- [Install Docker on Ubuntu](./install_docker_ubuntu.md)
- [Install SQL Server](./install_sql_server.md)

## Get access

- [Get access to GitHub](./get_access_to_github.md)
- [Get access to NPM](./get_access_to_npm.md)

## Open the project the first time

### Create a development folder

Our organization consists of multiple repos, so we recommend checking out
all projects into one development folder, e.g. `~/dev`:

```bash
mkdir -p ~/dev
cd ~/dev
```

### Clone the code

Open <https://github.com/ggsuite>, pick your repository and clone it:

```bash
git clone git@github.com:ggsuite/my-repo.git
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
