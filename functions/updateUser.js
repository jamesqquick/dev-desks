require('dotenv').config();

const { table, getUser, createUser } = require('./utils/airtable');
const { requireAuth } = require('./utils/auth');
exports.handler = requireAuth(async (event, context) => {
    const { claims: user } = context.identityContext;
    const username = user.handle;
    const { usesLink } = JSON.parse(event.body);

    try {
        const existingRecord = await getUser(username);

        if (existingRecord) {
            //update
            const minRecord = {
                id: existingRecord.id,
                fields: existingRecord.fields,
            };
            minRecord.fields.usesLink = usesLink;
            const updateRecords = [minRecord];
            await table.update(updateRecords);
            return {
                statusCode: 200,
                body: JSON.stringify(existingRecord),
            };
        } else {
            //create
            const createdRecord = await createUser(user);
            return {
                statusCode: 200,
                body: JSON.stringify(createdRecord),
            };
        }
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ err: 'Failed to update user' }),
        };
    }
});
