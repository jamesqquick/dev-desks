import React, { useEffect, useState, useCallback } from 'react';
import Upload from '../components/Upload';
import { useAuth0 } from '@auth0/auth0-react';
import { Image, Placeholder } from 'cloudinary-react';
import Transformation from 'cloudinary-react/lib/components/Transformation';
import UserProfileForm from '../components/UserProfileForm';

export default function Profile() {
    const [savedUser, setSavedUser] = useState(null);
    const { isLoading, user } = useAuth0();
    const loadUser = useCallback(async () => {
        if (isLoading) return;
        //if(!user) //go home

        const username = user.nickname;
        try {
            const res = await fetch(
                `/.netlify/functions/getUser?username=${username}`
            );
            const savedUser = await res.json();
            setSavedUser(savedUser);
        } catch (err) {
            console.error(err);
        }
    }, [isLoading, user]);
    useEffect(() => {
        loadUser();
    }, [loadUser]);

    return (
        <div>
            <UserProfileForm profileUpdated={loadUser} />
            <Upload imageUploaded={loadUser} />

            {savedUser && (
                <>
                    <h2>{savedUser.username}</h2>
                    <a href={`https://www.twitter.com/${savedUser.username}`}>
                        @{savedUser.username}
                    </a>
                    <p>
                        {savedUser && savedUser.usesLink && (
                            <a href={savedUser.usesLink}>Uses Page</a>
                        )}
                    </p>
                    <Image
                        cloudName="jamesqquick"
                        loading="lazy"
                        publicId={
                            savedUser.imgId ||
                            'dev_setups/placeholder-image_vcbif2'
                        }
                    >
                        <Transformation width="800" crop="fill" />
                        <Placeholder type="blur" />
                    </Image>
                </>
            )}
        </div>
    );
}
