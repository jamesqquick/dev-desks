const { getUser } = require('../../utils/airtable');

import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req, res) => {
    const { user } = await getSession(req, res);
    const username = user[`${process.env.AUTH0_TOKEN_NAMESPACE}handle`];

    try {
        const profile = await getUser(username);
        res.json(profile);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: 'Failed to update user' });
    }
});
