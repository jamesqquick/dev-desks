const {
    table,
    getMinifiedRecord,
    getImageForUser,
} = require('./utils/airtable');
exports.handler = async (event) => {
    let username = event.queryStringParameters['username'];
    if (!username) {
        return {
            statusCode: 400,
            body: JSON.stringify({ err: 'Who are you looking for?' }),
        };
    }
    try {
        const minifiedRecord = getMinifiedRecord(
            await getImageForUser(username)
        );
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
};
