export const getSavedUser = async (username) => {
    return await (
        await fetch(`/.netlify/functions/getUser?username=${username}`)
    ).json();
};

export const getLoggedInUser = async (token) => {
    return await (
        await fetch(`/.netlify/functions/me`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
    ).json();
};
