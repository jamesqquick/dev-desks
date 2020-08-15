import React, { useState } from 'react';
import UserProfileForm from '../components/UserProfileForm';
import Upload from '../components/UploadProfileImage';
import Modal from 'react-modal';
import ProfileWrapper from './ProfileWrapper';

export default function EditProfile({ user, profileUpdated }) {
    const [uploadVisible, setUploadVisible] = useState(false);
    Modal.setAppElement('#root');

    const customStyles = {
        content: {},
        overlay: {},
    };

    const imageUploaded = async ({ imgId }) => {
        // setSavedUser((prevUser) => ({
        //     ...prevUser,
        //     imgId: imgId,
        // }));
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
            <ProfileWrapper
                user={user}
                imageClicked={() => setUploadVisible(true)}
            >
                <UserProfileForm profileUpdated={profileUpdated} user={user} />
            </ProfileWrapper>
        </div>
    );
}
