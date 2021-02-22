import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import {
    createProfile,
    getProfileBySub,
    getProfileByTwitterUsername,
    updateProfile,
} from '../../../utils/airtable';

const afterCallback = async (req, res, session, state) => {
    const { user } = session;
    const { sub, name, nickname } = user;
    const existingProfile = await getProfileBySub(sub);
    if (!existingProfile) {
        //backwards compatibility
        const existingTwitterProfile = await getProfileByTwitterUsername(
            nickname
        );
        if (existingTwitterProfile) {
            console.info('Updating existing (old) profile.');
            updateProfile(existingTwitterProfile.id, {
                sub,
                name,
            });
        } else {
            const profile = {
                sub,
                name,
            };
            if (sub && sub.includes('twitter')) {
                profile.twitterUsername = nickname;
            }
            console.info('Creating new user', profile);
            await createProfile(profile);
        }
    }
    return session;
};

export default handleAuth({
    async callback(req, res) {
        try {
            await handleCallback(req, res, { afterCallback });
        } catch (error) {
            res.status(error.status || 500).end(error.message);
        }
    },
});

export function getCustomIdTokenProperty(user, name) {
    return user[`${process.env.AUTH0_TOKEN_NAMESPACE}${name}`];
}

export function userHasRole(user, role) {
    const roles = getCustomIdTokenProperty(user, 'roles') || [];
    return roles.includes(role);
}
