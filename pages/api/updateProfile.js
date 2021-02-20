const { table, getUser, createUser } = require('../../utils/airtable');

import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req, res) => {
    const { user } = await getSession(req, res);
    const username = user[`${process.env.AUTH0_TOKEN_NAMESPACE}handle`];
    const { usesLink } = req.body;
    try {
        const existingRecord = await getUser(username);

        if (existingRecord) {
            //update
            const recordUpdate = {
                id: existingRecord.id,
                fields: { usesLink },
            };
            await table.update([recordUpdate]);
            return res.json(existingRecord);
        } else {
            //create
            res.json(await createUser(username, usesLink));
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: 'Failed to update user' });
    }
});
