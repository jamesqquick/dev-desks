# Dev Setups

Dev Setups is a platform where users can share pictures of their desk setups. It is powered by React, Netlify Functions, Airtable, and Cloudinary.

## Setup

You'll need a free account with the following platforms.

-   Airtable
-   Cloudinary

An Auth0 account is needed but you can use the credentials below. The Auth0 configuration is already done.

### Airtable Setup

You'll need to create a base in Airtable and a table within the base for storing user info

-   username (primary field) - single line text
-   imgId - single line text
-   usesLink - single line text
-   description - long text
-   approved - checkbox

### Environment Variables

After creating the free accounts above, you'll need to create a `.env` file with the following properties. You can copy from here or from the `.env.sample` file.

```javascript
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
REACT_APP_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_UPLOAD_PRESET=

AIRTABLE_API_KEY=
AIRTABLE_BASE_ID=
AIRTABLE_TABLE_NAME=

AUTH0_DOMAIN=https://jamesqquick-demos.us.auth0.com/
AUTH0_AUDIENCE=https://dev-setups-api
AUTH0_NAMESPACE=http://devsetups.com/
```

## How to Run

Install the Netlify CLI

```bash
npm install netlify-cli
```

Then, run the app with following command.

```bash
netlify dev
```

You can then open the app at `localhost:8888`


### How to contribute

Look at the existing issues and ask the maintainers to assign you to whatever issue you want to work on. If you have a feature idea, create an issue. For contributing, fork the project first and create a branch with:

```
git checkout -b featureName
```

After committing your changes and pushing them to your fork, create a PR and the maintainers will have a look at it.
