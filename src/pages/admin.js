import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect, useCallback } from 'react';
import { Image, Transformation, Placeholder } from 'cloudinary-react';

export default function Admin() {
    const [unapprovedImages, setUnapprovedImages] = useState([]);
    const { getAccessTokenSilently } = useAuth0();

    const loadUnapprovedImages = useCallback(async () => {
        const token = await getAccessTokenSilently();
        try {
            const res = await fetch('/.netlify/functions/unapprovedImages', {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            setUnapprovedImages(data);
        } catch (err) {
            console.error(err);
        }
    }, [getAccessTokenSilently]);
    useEffect(() => {
        loadUnapprovedImages();
    }, [getAccessTokenSilently, loadUnapprovedImages, setUnapprovedImages]);
    console.log('doing stuff');

    const approveImage = async (username, approved) => {
        const token = await getAccessTokenSilently();
        try {
            const res = await fetch('/.netlify/functions/unapprovedImages', {
                method: 'PUT',
                headers: {
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ username, approved }),
            });
            await loadUnapprovedImages();
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div>
            <h1 className="text-4xl my-4 text-center">Admin</h1>
            {unapprovedImages.map((image) => (
                <div key={image.username}>
                    <Image
                        cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                        publicId={image.imgId}
                        className="rounded-md shadow-md "
                        loading="lazy"
                    >
                        <Transformation height="400" />
                        <Placeholder type="blur" />
                    </Image>
                    <div className="mt-2 flex space-x-2">
                        <button
                            type="submit"
                            onClick={() => approveImage(image.username, true)}
                            className="inline-block text-sm px-4 py-2 rounded bg-accent-green-400 text-white hover:bg-accent-green-500 "
                        >
                            Approve
                        </button>
                        <button
                            type="submit"
                            onClick={() => approveImage(image.username, false)}
                            className="inline-block text-sm px-4 py-2 rounded bg-red-400 text-white hover:bg-red-500 "
                        >
                            Reject
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
