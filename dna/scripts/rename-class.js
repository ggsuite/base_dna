#!/usr/bin/env node

/*
 * @license
 * Copyright (c) dnaCopyrightHolder
 *
 * Use of this source code is governed by terms that can be
 * found in the LICENSE file in the root of this package.
 */

/**
 * Renames a class throughout the current working directory: rewrites imports,
 * renames files and replaces all occurrences in `.ts`, `.md`, `.log`, `.js` and
 * `.json` files. All casings are handled — UpperCamelCase, lowerCamelCase and
 * kebab-case. Hidden folders and `node_modules` are skipped.
 *
 * Run this from the repository root. The replacement is done in place and is
 * not reversible, so commit or stash your work first.
 *
 * Usage:
 *   node scripts/rename-class.js <ClassA> <ClassB>
 *
 * Example:
 *   node scripts/rename-class.js MyOldClass MyNewClass
 */

import fs from 'fs';
import path from 'path';
import { blue, gray, green, red, yellow } from './functions/colors.js';

// .............................................................................
const fileNameRexp = /(\.ts|\.md|\.log|\.js|\.json)$/;
const excludedFiles = ['create-new-repo.md', 'rename-class.js'];

// .............................................................................

const isExcluded = (fileName) => {
  return excludedFiles.includes(fileName);
};

const shouldProcessFile = (file) =>
  fileNameRexp.test(file) && !isExcluded(file);

if (process.argv.length < 4) {
  const usage = red('Usage:');
  const script = yellow(path.basename(process.argv[1]));
  const classA = green('ClassA');
  const classB = blue('ClassB');
  console.error([usage, script, classA, classB].join(' '));
  process.exit(1);
}

const classA = process.argv[2];
const classB = process.argv[3];

const toSnakeCase = (str) => {
  return str.replace(/(?<=[a-z0-9])([A-Z])/g, '-$1').toLowerCase();
};

const toLowerCamelCase = (str) => {
  const camelCase = str.replace(/([-_]\w)/g, (matches) =>
    matches[1].toUpperCase(),
  );

  // 'MyThing' must become 'myThing'. Without this the lower camel case form of
  // an UpperCamelCase input stays upper case, and instance names like 'item'
  // are then rewritten by the kebab-case rule into invalid identifiers.
  return camelCase.charAt(0).toLowerCase() + camelCase.slice(1);
};

const toUpperCamelCase = (str) => {
  return str.replace(/(?:^|[-_])(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
};

const classALower = toLowerCamelCase(classA);
const classBLower = toLowerCamelCase(classB);
const classAUpper = toUpperCamelCase(classA);
const classBUpper = toUpperCamelCase(classB);
const classASnake = toSnakeCase(classA);
const classBSnake = toSnakeCase(classB);

const replaceIncludesFirst = (directory) => {
  const files = fs.readdirSync(directory, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(directory, file.name);

    if (file.isDirectory()) {
      if (file.name.startsWith('.') || file.name === 'node_modules') continue;
      replaceIncludesFirst(fullPath);
    } else if (shouldProcessFile(file.name)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(
        new RegExp(`(\\/)${classASnake}(\\.ts)?([\\.\\/\\'\\\"\\\\])`, 'g'),
        `$1${classBSnake}$2$3`,
      );
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
};

const replaceInFiles = (directory) => {
  const files = fs.readdirSync(directory, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(directory, file.name);

    if (file.isDirectory()) {
      if (file.name.startsWith('.') || file.name === 'node_modules') continue;
      replaceInFiles(fullPath);
    } else if (shouldProcessFile(file.name)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      // The names are anchored at word boundaries. Without that, a short class
      // name like 'Item' would also be replaced inside unrelated identifiers.
      content = content
        .replace(new RegExp(`\\b${classAUpper}\\b`, 'g'), classBUpper)
        .replace(new RegExp(`\\b${classALower}\\b`, 'g'), classBLower)
        .replace(new RegExp(`\\b${classASnake}\\b`, 'g'), classBSnake);
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
};

const renameFiles = (directory) => {
  const files = fs.readdirSync(directory, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(directory, file.name);

    if (file.isDirectory()) {
      if (file.name.startsWith('.') || file.name === 'node_modules') continue;
      renameFiles(fullPath);
    } else if (file.name.includes(classASnake)) {
      const newFileName = file.name.replace(classASnake, classBSnake);
      fs.renameSync(fullPath, path.join(directory, newFileName));
    }
  }
};

console.log(gray('Replacing includes first...'));
replaceIncludesFirst('.');

console.log(gray('Renaming files...'));
renameFiles('.');

console.log(gray('Replacing occurrences in files...'));
replaceInFiles('.');

console.log(green('Done.'));
