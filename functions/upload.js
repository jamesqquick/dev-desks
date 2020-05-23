require('dotenv').config();
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const { table } = require('./utils/airtable');
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
    const file = event.body;
    const username = user['http://whotofollow.com/handle'];

    try {
        const { public_id } = await cloudinary.uploader.upload(file);
        console.log(public_id);
        const record = await table.create({
            imgId: public_id,
            username: 'jamesqquick',
            likes: 0,
        });
        return {
            statusCode: 200,
            body: JSON.stringify(record),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ err: 'Failed to upload image' }),
        };
    }
};
