import React, { useEffect, useState, useCallback } from 'react';
import Upload from '../components/Upload';
import { useAuth0 } from '../utils/auth';
import { Image } from 'cloudinary-react';
import Transformation from 'cloudinary-react/lib/components/Transformation';

export default function Profile() {
    const [savedUser, setSavedUser] = useState(null);
    const { loading, user } = useAuth0();

    const loadUser = useCallback(async () => {
        if (loading) return;
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
    }, [loading, user]);
    useEffect(() => {
        loadUser();
    }, [loadUser, loading]);

    return (
        <div>
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
