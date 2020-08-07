import React from 'react';
import { useState } from 'react';
import { useAuth0 } from '../utils/auth';

export default function UserProfileForm() {
    const [usesLink, setUsesLink] = useState('');
    const { user, getTokenSilently } = useAuth0();

    const resetForm = () => {
        setUsesLink('');
    };

    const updateUserProfile = async (e) => {
        e.preventDefault();
        const username = user['http://whotofollow.com/handle'];
        const token = await getTokenSilently();
        try {
            await fetch('/.netlify/functions/updateUser', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    usesLink,
                }),
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            resetForm();
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
