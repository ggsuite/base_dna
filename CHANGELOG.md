# Changelog

## 0.3.3 - 2026-09-02

### Fixed

- The shipped scripts and the Dart class template carried a hard-coded
  `Copyright (c) ggsuite` header, so consuming organizations got a
  foreign copyright line. They now reference `dnaCopyrightHolder`.
- `create-repo-guide.md` (de/en) prefixed `dnaGitOrgUrl` with
  `https://github.com/` although the variable already holds a full URL,
  which rendered as `https://github.com/https://github.com/<org>`. The
  clone line uses `dnaGitOrg` instead of the URL.

## 0.3.2 - 2026-09-02

### Fixed

- `scripts/functions/current-branch.js`, `pull-request-url.js` and
  `is-main-up-to-date.js` used `execSync` (and `red`) without importing
  them — every consumer that ran one of these scripts got a
  `ReferenceError`. The missing imports are back.

## 0.3.1 - 2026-08-18

## 0.3.0 - 2026-08-14

## 0.2.0 - 2026-08-14

## 0.1.0 - 2026-08-14

## 0.0.4 - 2026-08-12

- Initial implementation. Copied from base_dna
