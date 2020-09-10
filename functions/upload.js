require('dotenv').config();
const { cloudinary } = require('./utils/cloudinary');
const { requireAuth } = require('./utils/auth');

const { table, getUser, createUser } = require('./utils/airtable');
exports.handler = requireAuth(async (event, context) => {
    try {
        const { claims: user } = context.identityContext;

        const file = event.body;
        const username = user.handle;
        const existingUser = await getUser(username);

        if (!existingUser) {
            const createdRecord = await createUser(user);
            return {
                statusCode: 200,
                body: JSON.stringify(createdRecord),
            };
        }
        if (existingUser.fields.imgId) {
            //delete previous image from Cloudinary if one already exists
            await cloudinary.api.delete_resources([existingUser.fields.imgId]);
        }
        const { public_id } = await cloudinary.uploader.upload(file, {
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
        });

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
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ err: 'Failed to upload image' }),
        };
    }
});
