import React, { useState } from 'react';
import UserProfileForm from '../components/UserProfileForm';
import UserImageUpload from '../components/UserImageUpload';
export default function EditProfile({ user, profileUpdated }) {
    const imageUploaded = async ({ imgId }) => {
        // setSavedUser((prevUser) => ({
        //     ...prevUser,
        //     imgId: imgId,
        // }));
    };
    return (
        <div>
            <UserImageUpload />
            <UserProfileForm profileUpdated={profileUpdated} user={user} />
        </div>
    );
}
