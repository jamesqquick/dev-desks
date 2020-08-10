import React from 'react';
import { useImage } from 'use-cloudinary';

export default function Image({ cloudName, publicId, transforms }) {
    const { getImage, data, status, error } = useImage({
        cloud_name: cloudName,
    });

    React.useEffect(() => {
        if (!publicId) return;
        getImage({
            public_id: publicId,
            transform_options: {
                ...transforms,
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publicId]);

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'error') return <p>{error.message}</p>;

    return (
        <img
            src={data}
            className="card-img-top"
            alt="Transformed from Cloudinary"
        />
    );
}
