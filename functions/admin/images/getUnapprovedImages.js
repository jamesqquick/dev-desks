const { getImages } = require('../../utils/airtable');
const { requireScope } = require('../../utils/auth');

module.exports = requireScope(
    'read:unapprovedImages',
    async (event, context) => {
        try {
            return {
                statusCode: 200,
                body: JSON.stringify(await getImages(false)),
            };
        } catch (err) {
            console.error(err);
            return {
                statusCode: 500,
                body: JSON.stringify({ err: 'Failed to get users' }),
            };
        }
    }
);
