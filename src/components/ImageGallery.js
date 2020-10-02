import React from 'react';
import { Image, Transformation, Placeholder } from 'cloudinary-react';
import { Link } from 'react-router-dom';

export default function ImageGallery({ images }) {
    return (
        <div className="image-gallery">
            {images &&
                images.map((image, index) => (
                    <Link to={`/users/${image.username}`} key={index}>
                        <Image
                            cloudName={
                                process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
                            }
                            publicId={image.imgId}
                            className="gallery-img"
                            loading="lazy"
                        >
                            <Transformation
                                width="200"
                                height="200"
                                crop="fill"
                            />
                            <Placeholder type="blur" />
                        </Image>
                    </Link>
                ))}
        </div>
    );
}
