var jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const { promisify } = require('util');

let signingKey;
const client = jwksClient({
    cache: true, // Default Value
    cacheMaxEntries: 5, // Default value
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

const NAMESPACE = 'http://whotofollow.com';

const doesUserHavePermission = (user, targetPermission) => {
    if (!user) return false;

    const NAMESPACE = 'http://whotofollow.com';
    const userPermissions = user[NAMESPACE + '/permissions'];

    if (!userPermissions) return false;
    return userPermissions.includes(targetPermission);
};

const availablePermissions = {
    CREATE_INFLUENCER: 'create:influencer',
    APPROVE_INFLUENCER: 'approve:influencer',
    DELETE_INFLUENCER: 'delete:influencer',
};

const checkHeaderForValidToken = async (headers) => {
    const rawAuthorizationHeader = headers['authorization'];

    if (!rawAuthorizationHeader) {
        throw 'Unauthorized. No access token included';
    }

    const accessToken = rawAuthorizationHeader.split(' ')[1];
    if (!accessToken) {
        throw 'Unauthorized. Token is invalid.';
    }

    if (!signingKey) {
        const getSigningKey = promisify(client.getSigningKey);
        try {
            const key = await getSigningKey(process.env.AUTH0_KEY_ID);
            signingKey = key.getPublicKey();
        } catch (err) {
            console.error(err);
            throw 'Failed to verify key';
        }
    }

    try {
        var decoded = jwt.verify(accessToken, signingKey);
    } catch (err) {
        console.error(err);
        throw err.message;
    }

    if (!decoded) {
        throw 'Failed to verify token';
    }
    return decoded;
};

module.exports = {
    availablePermissions,
    doesUserHavePermission,
    checkHeaderForValidToken,
};
