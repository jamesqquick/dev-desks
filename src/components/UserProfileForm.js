import React from 'react';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function UserProfileForm({ profileUpdated, user }) {
    console.log(user);
    const [usesLink, setUsesLink] = useState(user.usesLink);
    const { getAccessTokenSilently } = useAuth0();

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
            profileUpdated();
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <form onSubmit={updateUserProfile}>
            <div className="form-group">
                <label htmlFor="usesLink">Link to uses page (optional)</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="ex. https://www.jamesqquick.com/uses"
                    name="usesLink"
                    value={usesLink}
                    onChange={(e) => setUsesLink(e.target.value)}
                />
            </div>

            <button type="submit" className="btn btn-primary">
                Save
            </button>
        </form>
    );
}
