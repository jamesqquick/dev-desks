export const getSavedUser = async (username) => {
    return await (
        await fetch(`/.netlify/functions/getUser?username=${username}`)
    ).json();
};
