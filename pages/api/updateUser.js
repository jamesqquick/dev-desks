const { table, getUser, createUser } = require('../../utils/airtable');

const auth0 = require('../../utils/auth0');

export default auth0.default.requireAuthentication(async (req, res) => {
    const { user } = await auth0.default.getSession(req);
    console.log(user);
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
            console.log(username, usesLink);
            const createdRecord = await createUser(username, usesLink);
            console.log(createdRecord);
            return res.json(createdRecord);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: 'Failed to update user' });
    }
});
