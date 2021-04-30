# Contributing

## Pull Request process

### 1. Create a branch

This codebase has a Continuous Integration / Continuous Deployment (CI/CD)
integration with AWS Amplify that uses *branch detection*. This means that
if you commit a new branch to GitHub, Amplify will automatically spin up a
version of the site based on your branch.

You'll need to name your branch according to the following guidelines in
order for Amplify to pick up your branch in this fashion:

**feature-issuenumber-dash-separated-description**

Where **issuenumber** is the numerical value describing the issue you're working
on, and **dash-separated-description** is a short description to make it easier
for folks to read what you're working on without looking at the issue.

For example, if I'm working on issue `#23`, related to adding a class schedule
to the app, I might name my branch **feature-23-add-class-schedule**.

INFO: Technically, Amplify will pick up anything starting with `feature-`, but
it's good practice to add an issue number.

--------------------------------------------------------------------------------

### 2. Squash your branch

After your branch contains the feature you'd like to create a Pull Request for,
make sure to *squash* any smaller commits into a single commit. **Most Pull
Requests should contain one commit**, with few exceptions.

--------------------------------------------------------------------------------

### 3. Create a Pull Request against Production

This project follows the
[*Github Flow*](https://guides.github.com/introduction/flow/) branching model.
This means that we have two types of branches: One for production code, called
`production`, and *feature branches*.

When your branch is ready, create a Pull Request against `production`. You'll
need your code to be reviewed by at least one other person on the team to be
able to merge into `production`.

NOTE: Make sure to pull in `production`'s changes to your branch before
creating your Pull Request.
