require('dotenv').config();

const { table } = require('./utils/airtable');
const { requireAuth } = require('./utils/auth');
exports.handler = requireAuth(async (event, context) => {
    const { claims: user } = context.identityContext;
    const username = user.handle;
    const description = user['http://devsetups.com/description'];
    try {
        const createdRecord = await table.create({
            username,
            description,
        });
        return {
            statusCode: 200,
            body: JSON.stringify(createdRecord),
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ err: 'Failed to create user' }),
        };
    }
});
