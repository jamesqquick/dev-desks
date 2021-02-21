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

const getMinifiedRecords = (records) => {
    return records.map((record) => getMinifiedRecord(record));
};

const createUser = async (username, usesLink, imgId) => {
    return await table.create([
        {
            fields: { username, usesLink, imgId },
        },
    ]);
};

const getImages = async (approved) => {
    const filterBool = approved ? 'TRUE' : 'FALSE';
    const records = await table
        .select({
            filterByFormula: `( approved = ${filterBool}() )`,
        })
        .firstPage();
    return getMinifiedRecords(records).filter((record) => !!record.imgId);
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
    return getMinifiedRecord(records[0]);
};

const getUserById = async (id) => {
    const record = await table.find(id);
    return getMinifiedRecord(record);
};

const getUserIds = async () => {
    const userIds = [];

    await table
        .select({
            fields: [],
        })
        .eachPage((records, fetchNextPage) => {
            records.forEach((record) => userIds.push(record.id));
            fetchNextPage();
        });

    return userIds;
};

const approveImage = async (id) => {
    const updateRecord = {
        id,
        fields: { approved: true },
    };
    return await table.update([updateRecord]);
};

const deleteImage = async (id) => {
    const updateRecord = {
        id: id,
        fields: { imgId: null },
    };
    return await table.update([updateRecord]);
};

module.exports = {
    base,
    table,
    getMinifiedRecord,
    getUser,
    getUserById,
    getUserIds,
    likesTable,
    createUser,
    getImages,
    approveImage,
    deleteImage,
};
