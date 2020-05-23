require('dotenv').config();
const { table } = require('./utils/airtable');

exports.handler = async (event) => {
    try {
        const records = await table.select({}).firstPage();
        console.log(records);
        const formattedRecords = records.map((record) => ({
            id: record.id,
            ...record.fields,
        }));
        return {
            statusCode: 200,
            body: JSON.stringify(formattedRecords),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ err: 'Failed to upload image' }),
        };
    }
};
