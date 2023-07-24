const {
    table,
    getProfileBySub,
    createProfile,
} = require('../../utils/airtable');
const { cloudinary } = require('../../utils/cloudinary');
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req, res) => {
    const { user } = await getSession(req, res);
    const { sub } = user;
    const file = req.body;
    try {
        const existingRecord = await getProfileBySub(sub);
        if (existingRecord && existingRecord.imgId) {
            //delete previous image from Cloudinary if one already exists
            await cloudinary.api.delete_resources([existingRecord.imgId]);
        }
        const { public_id } = await cloudinary.uploader.upload(file, {
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
            transformation: [{ flags: "force_strip" }],
        });

        if (existingRecord) {
            //update the user
            const recordUpdate = {
                id: existingRecord.id,
                fields: { imgId: public_id, approved: false },
            };
            await table.update([recordUpdate]);
            return res.json(existingRecord);
        } else {
            const createdRecord = await createProfile({
                sub,
                imgId: public_id,
            });
            return res.json(createdRecord);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: 'Failed to update user' });
    }
});

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '5mb',
        },
    },
};
