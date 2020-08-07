require('dotenv').config();

const { table, getUser } = require('./utils/airtable');
const { checkHeaderForValidToken } = require('./utils/auth');
exports.handler = async (event) => {
    let user = null;
    try {
        user = await checkHeaderForValidToken(event.headers);
    } catch (err) {
        return {
            statusCode: 401,
            body: JSON.stringify({ err: 'Unauthorized' }),
        };
    }
    const { username, usesLink } = JSON.parse(event.body);
    const tokenUsername = user['http://whotofollow.com/handle'];

    if (username !== tokenUsername) {
        return {
            statusCode: 401,
            body: JSON.stringify({ err: 'Unauthorized' }),
        };
    }

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
            const createdRecord = await table.create({
                username,
                usesLink,
            });
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
};
