import React, { useEffect, useState } from 'react';
import ImageCard from './ImageCard';
import { Image, Transformation } from 'cloudinary-react';

export default function ImageGallery() {
    const [images, setImages] = useState(null);

    const loadImages = async () => {
        try {
            const res = await fetch('/.netlify/functions/getImages');
            const data = await res.json();
            setImages(data);
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
                images.map((image, index) => (
                    <Image
                        cloudName="jamesqquick"
                        publicId={image.imgId}
                        className="gallery-img"
                        key={index}
                    >
                        <Transformation width="300" height="300" crop="fill" />
                    </Image>
                ))}
        </div>
    );
}
