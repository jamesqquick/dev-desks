# Dev Setups

Dev Setups is a platform where users can share pictures of their desk setups. It is powered by React, Netlify Functions, Airtable, and Cloudinary.

## Setup

You'll need a free account with the following platforms.

-   Airtable
-   Cloudinary

An Auth0 account is needed but you can use the credentials below. The Auth0 configuration is already done.

### Airtable Setup

You'll need to create a base in Airtable and a table within the base for storing user info

-   imgId - single line text
-   username - single line text
-   usesLink - single line text

### Environment Variables

After creating the free accounts above, you'll need to create a `.env` file with the following properties. You can copy from here or from the `.env.sample` file.

```javascript
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

AIRTABLE_API_KEY=
AIRTABLE_BASE_ID=
AIRTABLE_TABLE_NAME=

AUTH0_DOMAIN=whotofollow.auth0.com
AUTH0_KEY_ID=83kBRWb7ovOMMVD6uEAHS
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

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
