# Get access to NPM

To publish Rljson packages to NPM, you need access.

## Create an account on NPM

Open <http://npmjs.com>

On the top right side, click `Sign up`

Follow the instructions to get an account.

## Request access to Rljson

Ask an administrator of the Rljson organization to perform the following steps:

1. Open <http://npmjs.com>
2. Login
3. Open <https://www.npmjs.com/settings/rljson/members>
4. Click on `Invite Members`
5. Enter your `Username or email`
6. Click on `Invite`

Open your mails and accept the invitation and follow the instructions

Ask the administrator to assign you the right role by doing the following steps:

1. Open <https://www.npmjs.com/settings/rljson/members>
2. Assigning the right role to you (`administrator`, `member`)

## Generate and install an access token

Open <http://npmjs.com>

Log in, when not already done

Click on the `avatar` at the top right corner

Click `Access Tokens`

Click `Generate New Token`

Select `Granular Access Tokens`

Select `Classic token`

Enter a `Token name`

Set an `Expiration`

Below `Packages and scopes`, `permissions`, select `Read and write`

Select `All packages` or the packages you are responsible for

Below `Organizations`, `permissions`, select `No access`

Click `Generate Token`

Copy the generated token

When not already existing, create a file `.npmrc` in your `user directory`

Add the following line

```bash
//registry.npmjs.org/:_authToken=your-auth-token
```

Replace `your-auth-token` by your token.

Now you should be able to publish package updates

