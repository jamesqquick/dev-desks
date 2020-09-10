const {
    NetlifyJwtVerifier,
    removeNamespaces,
} = require('@serverless-jwt/netlify');

const verifyJwt = NetlifyJwtVerifier({
    issuer: process.env.AUTH0_DOMAIN,
    audience: process.env.AUTH0_AUDIENCE,
    mapClaims: (claims) => {
        return removeNamespaces(process.env.AUTH0_NAMESPACE, claims);
    },
});

module.exports.requireAuth = verifyJwt;
