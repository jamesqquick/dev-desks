const { getImages } = require('../../utils/airtable');

export default async (req, res) => {
    try {
        res.json(await getImages(false));
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Failed to get unapproved images.' });
    }
};
