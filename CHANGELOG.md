# Changelog

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
