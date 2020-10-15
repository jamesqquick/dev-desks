import React from 'react';
import { Image, Transformation, Placeholder } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';

export default function ImageGallery({ images }) {
    const breakpointColumnsObj = {
        default: 3,
        1000: 2,
        700: 1,
    };
    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
        >
            {/* array of JSX items */}
            {images &&
                images.map((image, index) => (
                    <div className="">
                        <Link to={`/users/${image.username}`} key={index}>
                            <Image
                                cloudName={
                                    process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
                                }
                                publicId={image.imgId}
                                className="rounded-md shadow-md hover:shadow-xl transform transition-transform hover:-translate-y-1 duration-200"
                                loading="lazy"
                            >
                                <Transformation height="600" />
                                <Placeholder type="blur" />
                            </Image>
                        </Link>
                    </div>
                ))}
        </Masonry>
    );
}
