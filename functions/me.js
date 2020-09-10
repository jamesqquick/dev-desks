const { getMinifiedRecord, getUser, createUser } = require('./utils/airtable');
const { requireAuth } = require('./utils/auth');

exports.handler = requireAuth(async (event, context) => {
    const { claims: user } = context.identityContext;
    const username = user.handle;

    try {
        let userRecord = await getUser(username);

        if (!userRecord) {
            userRecord = await createUser(user);
        }

        const minifiedRecord = getMinifiedRecord(userRecord);
        return {
            statusCode: 200,
            body: JSON.stringify(minifiedRecord),
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ err: 'Something went wrong' }),
        };
    }
});
