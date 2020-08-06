require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
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
    const file = event.body;
    const username = user['http://whotofollow.com/handle'];
    try {
        const { public_id } = await cloudinary.uploader.upload(file, {
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
        });

        const existingRecord = await getUser(username);

        if (existingRecord) {
            //update
            const minRecord = {
                id: existingRecord.id,
                fields: existingRecord.fields,
            };
            minRecord.fields.imgId = public_id;
            const updateRecords = [minRecord];
            await table.update(updateRecords);
            return {
                statusCode: 200,
                body: JSON.stringify(existingRecord),
            };
        } else {
            //create
            const createdRecord = await table.create({
                imgId: public_id,
                username: 'jamesqquick',
            });
            console.log(createdRecord);
            return {
                statusCode: 200,
                body: JSON.stringify(createdRecord),
            };
        }
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ err: 'Failed to upload image' }),
        };
    }
};
