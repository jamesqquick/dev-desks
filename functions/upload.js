require('dotenv').config();
const { cloudinary } = require('./utils/cloudinary');
const { requireAuth } = require('./utils/auth');

const { table, getUser } = require('./utils/airtable');
exports.handler = requireAuth(async (event, context) => {
    try {
        const { claims: user } = context.identityContext;

        const file = event.body;
        const username = user.handle;
        const existingUser = await getUser(username);
        if (existingUser.fields.imgId) {
            //delete previous image from Cloudinary if one already exists
            await cloudinary.api.delete_resources([existingUser.fields.imgId]);
        }
        const { public_id } = await cloudinary.uploader.upload(file, {
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
        });

        if (existingUser) {
            const minRecord = {
                id: existingUser.id,
                fields: existingUser.fields,
            };
            minRecord.fields.imgId = public_id;
            const updateRecords = [minRecord];
            await table.update(updateRecords);
            return {
                statusCode: 200,
                body: JSON.stringify(existingUser),
            };
        } else {
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
