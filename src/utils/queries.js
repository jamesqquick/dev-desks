import { useAuth0 } from '@auth0/auth0-react';

export const getSavedUser = async (username) => {
    try {
        const res = await fetch(
            `/.netlify/functions/getUser?username=${username}`
        );
        if (res.status !== 200) {
            throw new Error('Failed to get user');
        }
        const data = await res.json();
        return data;
    } catch (err) {
        throw new Error('Failed to get user');
    }
};

export const getRandomUser = async () => {
    try {
        const res = await fetch(`/.netlify/functions/getRandomUser`);

        if (res.status !== 200) {
            throw new Error('Failed to get user');
        }

        const data = await res.json();
        return data;
    } catch (err) {
        throw new Error('Failed to get random user');
    }
};

export const getApprovedImages = async () => {
    try {
        const res = await fetch(`/.netlify/functions/getApprovedImages`);

        if (res.status !== 200) {
            throw new Error('Failed to get approved images');
        }

        const data = await res.json();
        return data;
    } catch (err) {
        throw new Error('Failed to get approved images');
    }
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
