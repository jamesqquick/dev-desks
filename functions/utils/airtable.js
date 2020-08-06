require('dotenv').config();
const Airtable = require('airtable');
Airtable.configure({
    apiKey: process.env.AIRTABLE_API_KEY,
});
const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
const table = base(process.env.AIRTABLE_TABLE_NAME);
const likesTable = base('likes');

const getMinifiedRecord = (record) => {
    return {
        id: record.id,
        ...record.fields,
    };
};

const getUser = async (username) => {
    const records = await table
        .select({
            maxRecords: 1,
            filterByFormula: `username = "${username}"`,
        })
        .firstPage();
    if (records.length === 0) {
        return null;
    }
    return records[0];
};
module.exports = {
    base,
    table,
    getMinifiedRecord,
    getUser,
    likesTable,
};
