require('dotenv').config();
const { approveImage, deleteImage, getUser } = require('../../utils/airtable');
const { cloudinary } = require('../../utils/cloudinary');
const { requireScope } = require('../../utils/auth');

module.exports = requireScope(
    'approve:unapprovedImages',
    async (event, context) => {
        try {
            const { username, approved } = JSON.parse(event.body);

            if (!username || approved === undefined) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({
                        err: 'Invalid request',
                    }),
                };
            }

            const existingRecord = await getUser(username);

            if (!existingRecord) {
                throw Error('User does not exist');
            }

            if (approved) {
                return {
                    statusCode: 200,
                    body: JSON.stringify(await approveImage(existingRecord.id)),
                };
            } else {
                //remove the imageId for user and delete the image from cloudinary
                await deleteImage(existingRecord.id);
                await cloudinary.api.delete_resources([
                    existingRecord.fields.imgId,
                ]);
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        imgId: existingRecord.fields.imgId,
                    }),
                };
            }
        } catch (err) {
            console.error(err);
            return {
                statusCode: 500,
                body: JSON.stringify({ msg: 'Something went wrong' }),
            };
        }
    }
);
