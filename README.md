# codeclubs.org

This is the main codeclubs.org website.

## Development

### Dependencies

You'll need the following dependencies to start working on the site:

- npm

### Getting started

Start by making sure you can log into our [development console on AWS](https://codeclubs.signin.aws.amazon.com/console).

Next, install node dependencies:

```shell
$ npm install
```

Then run the development server:

```shell
$ npm start
```

This will probably fail with an error:

```
./src/index.js
Module not found: Can't resolve './aws-exports' in '/home/sixstring982/Documents/Git/codeclubs.org/src'
```

We need to generate `./src/aws-exports.js` to continue. This file contains
information about auth to Amplify, which for some reason is required even to run
the app locally. You'll need an **AWS Access Key** to generate this.

#### Get your **access key** and **access key secret**

Before we get started with that, we'll want to get an **access key** for AWS to
get Amplify to work. Go to:

```
AWS console -> IAM -> Users -> Security credentials.
```

Once there, you can see your access keys. If you don't see any, hit `Create access key`. This will make both your **access key** and **access key secret**.
You may want to save a new access key to a password manager, since AWS will only
show it to you only this one time.

### Generate `./src/aws-export.js`

Once you have your access key, you'll need to configure Amplify. First, install
the Amplify CLI:

```shell
$ npm install -g @aws-amplify/cli
```

Next, initialize Amplify via the Amplify CLI:

```shell
$ amplify init
```

This will take you through a wizard. Answer the following questions:

- _Do you want to use an existing environment?_: **Yes**
- _Choose the environment you would like to use_: **develop**
- _Choose your default editor_: Up to you
- _Select the authentication method you want to use_: **AWS access keys**
- _accessKeyId_: Enter the access key ID you created above
- _secretAccessKey_: Enter the access key secret you created above
- _region_: **us-west-2**
