import React, { useEffect, useState, useCallback } from 'react';
import Upload from '../components/Upload';
import { useAuth0 } from '../utils/auth';
import Image from '../components/Image';

export default function Profile() {
    //get user's profile pic if it exists
    //display that picture
    const [profilePicId, setProfilePicId] = useState(null);
    const { user } = useAuth0();

    const loadUserImage = useCallback(async () => {
        console.log('loading image');
        const username = user['http://whotofollow.com/handle'];
        try {
            const res = await fetch(
                `/.netlify/functions/getUserImage?username=${username}`
            );
            const data = await res.json();
            console.log(data);
            data.imgId && setProfilePicId(data.imgId);
        } catch (err) {
            console.error(err);
        }
    }, [user]);
    useEffect(() => {
        loadUserImage();
    }, [loadUserImage]);

    return (
        <div>
            <h1>Profile</h1>
            <Upload imageUploaded={loadUserImage} />
            {!profilePicId && <p>You should upload an image</p>}

            {profilePicId && (
                <>
                    <h3>Here's your existing picture</h3>
                    <Image
                        cloudName="jamesqquick"
                        publicId={profilePicId}
                        transforms={{
                            width: 300,
                            crop: 'scale',
                        }}
                    />
                </>
            )}
        </div>
    );
}
