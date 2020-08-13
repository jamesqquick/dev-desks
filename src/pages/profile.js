import React, { useEffect, useState, useCallback } from 'react';
import Upload from '../components/UploadProfileImage';
import { useAuth0 } from '@auth0/auth0-react';
import { Image, Placeholder } from 'cloudinary-react';
import Transformation from 'cloudinary-react/lib/components/Transformation';
import UserProfileForm from '../components/UserProfileForm';
import Modal from 'react-modal';

export default function Profile() {
    const [savedUser, setSavedUser] = useState(null);
    const { isLoading, user } = useAuth0();
    const [uploadVisible, setUploadVisible] = useState(false);
    Modal.setAppElement('#root');

    const customStyles = {
        content: {},
        overlay: {},
    };

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

    const imageUploaded = async ({ imgId }) => {
        setSavedUser((prevUser) => ({
            ...prevUser,
            imgId: imgId,
        }));
    };

    return (
        <div>
            <Modal
                isOpen={uploadVisible}
                contentLabel="Upload Profile Image"
                style={customStyles}
            >
                <Upload
                    imageUploaded={imageUploaded}
                    closeModal={() => setUploadVisible(false)}
                />
            </Modal>
            <button onClick={() => setUploadVisible(true)}>
                Upload Profile Image
            </button>
            <UserProfileForm profileUpdated={loadUser} />

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
                        style={customStyles}
                    >
                        <Transformation width="800" crop="fill" />
                        <Placeholder type="blur" />
                    </Image>
                </>
            )}
        </div>
    );
}
