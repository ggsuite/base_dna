<!--
@license
Copyright (c) dnaCopyrightHolder

Use of this source code is governed by terms that can be
found in the LICENSE file in the root of this package.
-->

# Get access to GitHub

## Get a GitHub account

If you already have a GitHub account, skip this step.

Visit <https://github.com/>

In the top right corner, click `Sign up`

Follow the instructions to get an account

### Create an SSH key

If you have already created an SSH key, skip this step.

Visit <https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account>

In the tab bar select either `Mac`, `Windows` or `Linux`

Follow the instructions

## Request organization access

Ask an administrator of <dnaOrgUrl> to give you access to
the dnaCompany GitHub organization by performing the following steps:

1. Visit <dnaOrgUrl>

2. In the top menu, click `People`

3. Click the green `Invite member` button

4. Enter the new user's GitHub email address

5. And click `Invite`

6. Wait until the new user has accepted the invitation

7. Assign the right role (member, outside contributor etc.) to the new user

## Login with GitHub CLI & upload SSH key

We have [installed the GitHub CLI](./install-github-cli.md) before.

Now it is time to log in:

```bash
gh auth login
```

Select the following answers:

- ? Where do you use GitHub? `GitHub.com`
- ? What is your preferred protocol for Git operations on this host? `SSH`
- ? Upload your SSH public key to your GitHub account? `C:\Users\...`
- ? Title for your SSH key: (GitHub CLI) `Dell Laptop`
- ? How would you like to authenticate GitHub CLI? `Login with a web browser`

Copy the shown one-time code, right beside `First copy your one-time code`

Press `Enter`

A browser opens

Paste the code copied before

Make sure dnaCompany is selected

Click `Authorize GitHub`
