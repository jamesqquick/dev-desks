const {
    NetlifyJwtVerifier,
    removeNamespaces,
} = require('@serverless-jwt/netlify');

const requireAuth = NetlifyJwtVerifier({
    issuer: process.env.AUTH0_DOMAIN,
    audience: process.env.AUTH0_AUDIENCE,
    mapClaims: (claims) => {
        return removeNamespaces(process.env.AUTH0_NAMESPACE, claims);
    },
});

const requireScope = (scope, handler) =>
    requireAuth(async (event, context, cb) => {
        const { claims } = context.identityContext;

        // Require the token to contain a specific scope.
        if (
            !claims ||
            !claims.permissions ||
            claims.permissions.indexOf(scope) === -1
        ) {
            console.log('unauthorized');
            return {
                statusCode: 403,
                body: JSON.stringify({
                    error: 'access_denied',
                    error_description: `Token does not contain the required '${scope}' scope`,
                }),
            };
        }

        // Continue.
        return handler(event, context, cb);
    });

module.exports = {
    requireAuth,
    requireScope,
};
