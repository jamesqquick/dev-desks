import React from 'react';
import { useImage } from 'use-cloudinary';

export default function Image({ cloudName, publicId, transforms }) {
    const { getImage, data, status, error } = useImage({
        cloud_name: cloudName,
    });

    React.useEffect(() => {
        getImage({
            public_id: publicId,
            transform_options: {
                ...transforms,
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'error') return <p>{error.message}</p>;

    return (
        <img
            src={data}
            className="img img-fluid"
            alt="Transformed from Cloudinary"
        />
    );
}
