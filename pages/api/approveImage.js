import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { userHasRole } from './auth/[...auth0]';
const { approveImage } = require('../../utils/airtable');

export default withApiAuthRequired(async (req, res) => {
    const { user } = await getSession(req, res);
    if (!userHasRole(user, 'admin')) {
        return res.status(401);
    }
    const { imgId } = JSON.parse(req.body);
    try {
        res.json(await approveImage(imgId));
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Failed to approve image.' });
    }
});
