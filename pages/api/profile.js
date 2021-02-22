const { getProfileBySub } = require('../../utils/airtable');

import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req, res) => {
    const { user } = await getSession(req, res);
    const userSub = user.sub;

    try {
        const profile = await getProfileBySub(userSub);
        res.json(profile);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: 'Failed to update user' });
    }
});
