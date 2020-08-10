require('dotenv').config();
const { cloudinary } = require('./utils/cloudinary');
const { requireAuth } = require('./utils/auth');

const { table, getUser } = require('./utils/airtable');
exports.handler = requireAuth(async (event, context) => {
    try {
        const { claims: user } = context.identityContext;

        const file = event.body;
        const username = user.handle;
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
});
