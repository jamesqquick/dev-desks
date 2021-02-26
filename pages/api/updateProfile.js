const {
    table,
    getProfileBySub,
    createProfile,
} = require('../../utils/airtable');

import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req, res) => {
    const { user } = await getSession(req, res);
    const { sub, name } = user;

    const { usesLink, githubUsername, twitterUsername, description } = req.body;
    try {
        const existingRecord = await getProfileBySub(sub);

        if (existingRecord) {
            //update
            const recordUpdate = {
                id: existingRecord.id,
                fields: {
                    usesLink,
                    ...(githubUsername && { githubUsername }),
                    ...(twitterUsername && { twitterUsername }),
                    ...(description && { description }),
                },
            };
            await table.update([recordUpdate]);
            return res.json(existingRecord);
        } else {
            //create
            res.json(
                await createProfile({
                    sub,
                    name,
                    usesLink,
                })
            );
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: 'Failed to update user' });
    }
});
