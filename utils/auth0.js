import { initAuth0 } from '@auth0/nextjs-auth0';

console.log(`${process.env.APPLICATION_DOMAIN}/api/callback`);
export default initAuth0({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    scope: 'openid profile',
    redirectUri: `${process.env.APPLICATION_DOMAIN}/api/callback`,
    postLogoutRedirectUri: `${process.env.APPLICATION_DOMAIN}/`,
    session: {
        // The secret used to encrypt the cookie.
        cookieSecret: process.env.AUTH0_COOKIE_SECRET,
        // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
    },
});
