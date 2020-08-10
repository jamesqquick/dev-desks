import React, { useEffect, useState, useCallback } from 'react';
import Upload from '../components/Upload';
import { useAuth0 } from '@auth0/auth0-react';
import { Image } from 'cloudinary-react';
import Transformation from 'cloudinary-react/lib/components/Transformation';
import UserProfileForm from '../components/UserProfileForm';

export default function Profile() {
    const [savedUser, setSavedUser] = useState(null);
    const { isLoading, user } = useAuth0();

    const loadUser = useCallback(async () => {
        if (isLoading) return;
        //if(!user) //go home

        const username = user['http://whotofollow.com/handle'];
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
            <UserProfileForm />
            <Upload imageUploaded={loadUser} />

            {savedUser && (
                <>
                    <Image
                        cloudName="jamesqquick"
                        publicId={
                            savedUser.imgId ||
                            'dev_setups/placeholder-image_vcbif2'
                        }
                    >
                        <Transformation width="800" crop="fill" />
                    </Image>
                </>
            )}
        </div>
    );
}
