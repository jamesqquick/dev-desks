import React, { useState } from 'react';
import useProfile from '../hooks/UseProfile';
import UserImageUpload from './UserImageUpload';
import { useAlert } from 'react-alert';

export default function EditProfile({ profile }) {
    const { refreshProfile, updateProfile } = useProfile();
    const [usesLink, setUsesLink] = useState(profile.usesLink);
    const alert = useAlert();

    const handleUpdateProfile = async (e) => {
        try {
            e.preventDefault();
            await updateProfile({ usesLink });
            refreshProfile();
            alert.show('Profile updated successfully', {
                type: 'success',
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-screen-md mx-auto">
            <UserImageUpload existingImageId={profile.imgId} />
            <h1 className="text-4xl my-4 text-center">{profile.name}</h1>
            <form className="mt-4" onSubmit={handleUpdateProfile}>
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
                    disabled={profile.usesLink === usesLink}
                >
                    Save
                </button>
            </form>
        </div>
    );
}
