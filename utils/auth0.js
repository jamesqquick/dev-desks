import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    audience: process.env.AUTH0_AUDIENCE,
    scope: 'openid profile',
    redirectUri: 'http://localhost:3000/api/callback', //TODO: update for prod
    postLogoutRedirectUri: 'http://localhost:3000/', //TODO: update for prod
    session: {
        // The secret used to encrypt the cookie.
        cookieSecret: process.env.AUTH0_COOKIE_SECRET,
        // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
    },
});
