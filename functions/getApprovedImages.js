require('dotenv').config();
const { getImages } = require('./utils/airtable');

exports.handler = async (event) => {
    try {
        return {
            statusCode: 200,
            body: JSON.stringify(await getImages(true)),
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ err: 'Failed to get users' }),
        };
    }
};
