import React, { useEffect, useState, useCallback } from 'react';
import Upload from '../components/Upload';
import { useAuth0 } from '../utils/auth';
import { Image } from 'cloudinary-react';
import Navbar from '../components/Navbar';
import Transformation from 'cloudinary-react/lib/components/Transformation';

export default function Profile() {
    //get user's profile pic if it exists
    //display that picture
    const [savedUser, setSavedUser] = useState(null);
    const { user } = useAuth0();

    const loadUser = useCallback(async () => {
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
    }, [user]);
    useEffect(() => {
        loadUser();
    }, [loadUser]);

    return (
        <div>
            <h1 className="my-5 title text-center display-1">Profile</h1>
            <Navbar />

            <Upload imageUploaded={loadUser} />
            {savedUser && !savedUser.imgId && <p>You should upload an image</p>}

            {savedUser && savedUser.imgId && (
                <>
                    <h3>Here's your existing picture</h3>
                    <Image
                        cloudName="jamesqquick"
                        publicId={savedUser.imgId}
                        height="300"
                        className="img-thumbnail"
                    >
                        <Transformation width="300" height="300" crop="fill" />
                    </Image>
                </>
            )}
        </div>
    );
}
