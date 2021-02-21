import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export default handleAuth();

export function getCustomIdTokenProperty(user, name) {
    return user[`${process.env.AUTH0_TOKEN_NAMESPACE}${name}`];
}

export function userHasRole(user, role) {
    const roles = getCustomIdTokenProperty(user, 'roles') || [];
    return roles.includes(role);
}
