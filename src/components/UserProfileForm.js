import React from 'react';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function UserProfileForm({ profileUpdated }) {
    const [usesLink, setUsesLink] = useState('');
    const { getAccessTokenSilently } = useAuth0();

    const resetForm = () => {
        setUsesLink('');
    };

    const updateUserProfile = async (e) => {
        e.preventDefault();
        try {
            const token = await getAccessTokenSilently();
            await fetch('/.netlify/functions/updateUser', {
                method: 'POST',
                body: JSON.stringify({
                    usesLink,
                }),
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            resetForm();
            profileUpdated();
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <form onSubmit={updateUserProfile}>
            <label htmlFor="usesLink">Link to your uses page (optional)</label>
            <input
                type="text"
                name="usesLink"
                value={usesLink}
                onChange={(e) => setUsesLink(e.target.value)}
            />
            <button>Save</button>
        </form>
    );
}
