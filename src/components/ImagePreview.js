import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useAlert } from 'react-alert';

export default function ImagePreview({
    imageDataUrl,
    closeModal,
    imageUploaded,
}) {
    const { getAccessTokenSilently } = useAuth0();
    const alert = useAlert();

    const uploadImage = async (e) => {
        e.target.value = null;

        e.preventDefault();
        try {
            const token = await getAccessTokenSilently();
            await fetch('/.netlify/functions/upload', {
                method: 'POST',
                body: imageDataUrl,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            alert.show('User profile image successfully updated', {
                type: 'success',
            });
            imageUploaded();
            closeModal();
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className=" ">
            <img
                className="rounded-md shadow-lg mb-5 max-h-3/4 "
                src={imageDataUrl}
                alt="Desk Setup"
            />
            <div>
                <button
                    type="submit"
                    className="inline-block text-sm px-4 py-2 rounded bg-accent-green-400 text-white hover:bg-accent-green-500 mr-2"
                    disabled={!imageDataUrl}
                    onClick={uploadImage}
                >
                    Upload
                </button>
                <button
                    type="button"
                    className="inline-block text-sm px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 "
                    onClick={closeModal}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
