require('dotenv').config();
const { getUserIds, getUserById } = require('./utils/airtable');

exports.handler = async () => {
    try {
        const userIds = await getUserIds()
        const randomIndex = Math.floor(Math.random() * userIds.length)
        const userId = userIds[randomIndex]

        const user = await getUserById(userId)

        return {
            statusCode: 200,
            body: JSON.stringify(user),
        };
    } catch (err) {
        console.error(err);

        return {
            statusCode: 500,
            body: JSON.stringify({ err: 'Failed to get a random user' }),
        };
    }
};
