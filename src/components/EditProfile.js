import React, { useState } from 'react';
import UserImageUpload from '../components/UserImageUpload';
import { useAuth0 } from '@auth0/auth0-react';

export default function EditProfile({ user, profileUpdated }) {
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
        <>
            <UserImageUpload
                existingImageId={user.imgId}
                imageUploaded={() =>
                    profileUpdated(
                        'Thank you! Your image will be reviewed by an admin.'
                    )
                }
            />
            <h1 className="text-4xl my-4 text-center">@{user.username}</h1>
            <form className="mt-4" onSubmit={updateUserProfile}>
                <div className="mb-4">
                    <label
                        className="block  text-sm font-bold mb-2"
                        htmlFor="usesLink"
                    >
                        Uses Page URL (optional)
                    </label>
                    <input
                        type="text"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="ex. https://www.jamesqquick.com/uses"
                        name="usesLink"
                        value={usesLink}
                        onChange={(e) => setUsesLink(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="inline-block text-sm px-4 py-2 rounded bg-accent-green-400 text-white hover:bg-accent-green-500 disabled:opacity-50"
                    disabled={user.usesLink === usesLink}
                >
                    Save
                </button>
            </form>
        </>
    );
}
