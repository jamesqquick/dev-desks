import React, { useEffect, useState } from 'react';
import Image from './Image';

export default function ImageGallery() {
    const [images, setImages] = useState(null);

    const loadImages = async () => {
        try {
            const res = await fetch('/.netlify/functions/getImages');
            const data = await res.json();
            setImages(data);
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadImages();
    }, [setImages]);

    return (
        <div className="image-gallery">
            {images &&
                images.map((image) => (
                    <div className="card">
                        <Image
                            key={image.id}
                            publicId={image.imgId}
                            cloudName="jamesqquick"
                            transforms={{
                                width: 300,
                                height: 200,
                                crop: 'fill',
                            }}
                        />
                        <div className="card-body">
                            <div className="card-title">@{image.username}</div>
                        </div>
                    </div>
                ))}
        </div>
    );
}
