<!--
@license
Copyright (c) ggsuite

Use of this source code is governed by terms that can be
found in the LICENSE file in the root of this package.
-->

# Install gg

`gg` is the unified Dart CLI used for development at ggsuite. It runs
pre-commit checks in a single repository and orchestrates commits, pushes,
reviews and publishes across all repositories of a ticket.

## Prerequisites

Install [Flutter](./install_flutter.md) first. It provides the `dart`
command used below.

```bash
dart --version
```

## Install gg

```bash
dart pub global activate gg
```

## Add the pub cache to your PATH

Globally activated Dart executables are installed into the pub cache. Add its
`bin` folder to your `PATH`, otherwise the `gg` command will not be found.

Mac and Linux:

```bash
echo 'export PATH="$HOME/.pub-cache/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

On Windows, add the following folder to your `Path` environment variable:

```text
%LOCALAPPDATA%\Pub\Cache\bin
```

Restart your terminal afterwards.

## Verify installation

```bash
gg --help
```

## Update gg

Run the activation again to install the latest version:

```bash
dart pub global activate gg
```

## Usage

`gg` behaves differently depending on where you call it:

- In a **ticket workspace** (a directory tree containing `.master/` or
  `tickets/`), `gg <command>` operates on all repositories of the ticket.
- In a **single repository**, use `gg one <command>`.

Every command supports `-h` and `--help`:

```bash
gg do --help
```

See also [Working with gg and kd](./guides/gg_kidney.md).
