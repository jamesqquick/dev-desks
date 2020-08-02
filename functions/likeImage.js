const { likesTable } = require('./utils/airtable');
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
    const username = user['http://whotofollow.com/handle'];
    const { imgId, id } = JSON.parse(event.body);

    if (!imgId) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                err: 'Bad request',
            }),
        };
    }

    const newLikeRecord = {
        fields: {
            username,
            setups: [id],
        },
    };

    try {
        //see if the like alreeady exists
        const existingLikes = await likesTable
            .select({
                maxRecords: 1,
                filterByFormula: `AND(username = ${username}, setups = ${id} `,
            })
            .firstPage();
        console.log(existingLikes);
        await likesTable.create([newLikeRecord]);
        return {
            statusCode: 200,
            body: JSON.stringify({
                msg: 'Image liked',
            }),
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ err: 'Something went wrong' }),
        };
    }
};
