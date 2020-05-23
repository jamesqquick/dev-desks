exports.handler = async (event) => {
    return {
        statusCode: 500,
        body: JSON.stringify({ msg: 'Hello World' }),
    };
};
