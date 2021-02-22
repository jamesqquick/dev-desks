const Airtable = require('airtable');
Airtable.configure({
    apiKey: process.env.AIRTABLE_API_KEY,
});
const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
const table = base(process.env.AIRTABLE_TABLE_NAME);

const getMinifiedRecord = (record) => {
    return {
        id: record.id,
        ...record.fields,
    };
};

const getMinifiedRecords = (records) => {
    return records.map((record) => getMinifiedRecord(record));
};

const createProfile = async (fields) => {
    if (!fields.sub || !fields.name) {
        throw new Error('Sub and name are required for creating a user');
    }
    return await table.create([
        {
            fields,
        },
    ]);
};

const updateProfile = async (id, fields) => {
    const recordUpdate = {
        id,
        fields,
    };
    return await table.update([recordUpdate]);
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

const getProfileBySub = async (sub) => {
    const records = await table
        .select({
            maxRecords: 1,
            filterByFormula: `sub = "${sub}"`,
        })
        .firstPage();
    if (records.length === 0) {
        return null;
    }
    return getMinifiedRecord(records[0]);
};

const getProfileByTwitterUsername = async (twitterUsername) => {
    const records = await table
        .select({
            maxRecords: 1,
            filterByFormula: `twitterUsername = "${twitterUsername}"`,
        })
        .firstPage();
    if (records.length === 0) {
        return null;
    }
    return getMinifiedRecord(records[0]);
};

const getProfileByRecordId = async (id) => {
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
    getProfileBySub,
    getProfileByTwitterUsername,
    getProfileByRecordId,
    getUserIds,
    createProfile,
    getImages,
    approveImage,
    deleteImage,
    updateProfile,
};
