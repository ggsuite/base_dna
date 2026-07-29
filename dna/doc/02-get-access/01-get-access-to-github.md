# Get access To GitHub

## Get a GitHub account

If you have already an GitHub account, skip this step.

Visit <https://github.com/>

In the top right corner, click `Sign up`

Follow the instructions to get an account

### Create an SSH key

If you already have created an SSH key, skip this step.

Visit <https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account>

In the Tab bar select either `Mac`, `Windows` or `Linux`

Follow the instructions

## Request organization access

Ask an Administrator of the <https://github.com/rljson> to give you access to
the Rljson GitHub organization by performing the following steps:

1. Visit <https://github.com/rljson>

2. In the top menu, click `People`

3. Click the green `Invite member` button

4. Enter the new user's GitHub email address.

5. And click `Invite`

6. Wait until the new user has accepted the invitation

7. Assign the right role (member, outside contributor etc) to the new user

## Login with GitHub CLI & Upload SSH Key

We have installed the GitHub CLI before

Now its time to login

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

Brows opens

Paste the code copied before

Make sure `rljson` is selected

Click `Authorize GitHub`
