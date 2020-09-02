import React, { useEffect, useState, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import PublicProfile from '../components/PublicProfile';
import EditProfile from '../components/EditProfile';
import { FaEdit, FaRegWindowClose } from 'react-icons/fa';
import { Transformation } from 'cloudinary-react';
import Image from 'cloudinary-react/lib/components/Image';

export default function Profile({ match }) {
    const [savedUser, setSavedUser] = useState(null);
    const { isLoading, user: loggedInUser } = useAuth0();
    const { params } = match;
    const [showEdit, setShowEdit] = useState(false);

    const loadUser = useCallback(async () => {
        if (isLoading) return;
        const username = params.username;
        try {
            const res = await fetch(
                `/.netlify/functions/getUser?username=${username}`
            );
            const savedUser = await res.json();
            setSavedUser(savedUser);
        } catch (err) {
            console.error(err);
        }
    }, [isLoading, params.username]);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    const profileUpdated = () => {
        loadUser();
        setShowEdit(false);
    };

    const showEditButton =
        loggedInUser &&
        !showEdit &&
        savedUser &&
        loggedInUser.nickname === savedUser.username;

    if (savedUser) {
        return (
            <>
                <Image
                    cloudName="jamesqquick"
                    publicId={
                        savedUser.imgId || 'dev_setups/placeholder-image_vcbif2'
                    }
                    className="rounded-md shadow-lg mx-auto"
                >
                    <Transformation width="800" crop="fill" />
                </Image>

                {showEditButton && (
                    <button
                        className="my-2 flex items-center ml-auto"
                        onClick={() => setShowEdit(true)}
                    >
                        <span className="mr-2">Edit</span> <FaEdit />
                    </button>
                )}
                {showEdit && (
                    <button
                        className="my-2 flex items-center ml-auto"
                        onClick={() => setShowEdit(false)}
                    >
                        <span className="mr-2">Cancel</span>{' '}
                        <FaRegWindowClose />
                    </button>
                )}
                <h1 className="text-4xl my-4 text-center">
                    @{savedUser.username}
                </h1>
                {!showEdit && <PublicProfile user={savedUser} />}
                {showEdit && (
                    <EditProfile
                        user={savedUser}
                        profileUpdated={profileUpdated}
                    />
                )}
            </>
        );
    }
    return null;
}
