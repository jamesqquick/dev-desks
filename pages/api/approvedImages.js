const { getImages } = require('../../utils/airtable');

export default async (req, res) => {
    try {
        res.json(await getImages(true));
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Failed to get approved images.' });
    }
};
