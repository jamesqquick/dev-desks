require('dotenv').config();
const {
    getUnapprovedImages,
    updateUnapprovedImage,
} = require('./admin/images');

exports.handler = async (event, context) => {
    if (event.httpMethod === 'GET') {
        return await getUnapprovedImages(event, context);
    } else if (event.httpMethod === 'PUT') {
        return await updateUnapprovedImage(event, context);
    } else {
        return {
            statusCode: 405,
        };
    }
};
