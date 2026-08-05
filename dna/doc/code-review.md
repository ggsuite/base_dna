<!--
@license
Copyright (c) dnaCopyrightHolder

Use of this source code is governed by terms that can be
found in the LICENSE file in the root of this package.
-->

# Code review

- [Preparation](#preparation)
- [Get the pull request URL](#get-the-pull-request-url)
- [Add a reviewer](#add-a-reviewer)
- [Request the reviewer to review](#request-the-reviewer-to-review)

## Preparation

Do all steps described in [develop.md](./develop.md) up to
"Create a pull request".

## Get the pull request URL

```bash
node scripts/print-pull-request-url.js
```

Click on the printed link.

## Add a reviewer

Click on the `gear` right beside `Reviewers` at the upper right side of the
pull request page.

Select a `code reviewer`.

## Request the reviewer to review

Drop a private message to the reviewer about the code review.

Ask the reviewer to do the following steps:

1. Open the pull request URL
2. Click on the `Files changed` tab right beside `Conversation`
3. Review the changes
4. Comment directly on code lines (hover over the line, click the plus)
5. Click the green `Start a review` button
6. When done, click on `Finish your review`
7. Enter a final comment
8. Click `Submit review`
9. Drop a private message to the author that the code review is done
