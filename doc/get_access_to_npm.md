<!--
@license
Copyright (c) ggsuite

Use of this source code is governed by terms that can be
found in the LICENSE file in the root of this package.
-->

# Get access to NPM

To publish ggsuite packages to NPM, you need access.

## Create an account on NPM

Open <https://npmjs.com>

On the top right side, click `Sign up`

Follow the instructions to get an account.

## Request access to the organization

Ask an administrator of the ggsuite NPM organization to perform the
following steps:

1. Open <https://npmjs.com>
2. Login
3. Open <https://www.npmjs.com/settings/ggsuite/members>
4. Click on `Invite Members`
5. Enter your `Username or email`
6. Click on `Invite`

Open your mails, accept the invitation and follow the instructions.

Ask the administrator to assign you the right role by doing the following
steps:

1. Open <https://www.npmjs.com/settings/ggsuite/members>
2. Assign the right role to you (`administrator`, `member`)

## Generate and install an access token

Open <https://npmjs.com>

Log in, when not already done

Click on the `avatar` at the top right corner

Click `Access Tokens`

Click `Generate New Token`

Select `Granular Access Token`

Enter a `Token name`

Set an `Expiration`

Below `Packages and scopes`, `Permissions`, select `Read and write`

Select `All packages` or the packages you are responsible for

Below `Organizations`, `Permissions`, select `No access`

Click `Generate Token`

Copy the generated token

When not already existing, create a file `.npmrc` in your `user directory`

Add the following line:

```bash
//registry.npmjs.org/:_authToken=your-auth-token
```

Replace `your-auth-token` by your token.

Now you should be able to publish package updates.
