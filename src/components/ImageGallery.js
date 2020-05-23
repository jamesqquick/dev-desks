import React, { useEffect, useState, useCallback } from 'react';
import Image from './Image';
export default function ImageGallery() {
    const [images, setImages] = useState(null);

    const loadImages = useCallback(async () => {
        try {
            const res = await fetch('/.netlify/functions/getImages');
            const data = await res.json();
            setImages(data);
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        console.log('getting images');
        //loadImages();
    }, [loadImages]);

    return (
        <div>
            {images &&
                images.map((image) => (
                    <Image
                        key={image.id}
                        publicId={image.imgId}
                        cloudName="jamesqquick"
                        transforms={{
                            width: 300,
                            crop: 'scale',
                        }}
                    />
                ))}
        </div>
    );
}
