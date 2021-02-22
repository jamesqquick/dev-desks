import React from 'react';
import { Image, Transformation, Placeholder } from 'cloudinary-react';
import Masonry from 'react-masonry-css';
import GalleryPlaceholder from './GalleryPlaceholder';
import Link from 'next/link';
export default function ImageGallery({ images }) {
    const breakpointColumnsObj = {
        default: 3,
        1000: 2,
        700: 1,
    };

    if (!images) {
        return <GalleryPlaceholder />;
    }
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
        >
            {/* array of JSX items */}

            {images &&
                images.map((image, index) => (
                    <div key={index}>
                        <Link href={`/users/${image.sub}`}>
                            <a>
                                <Image
                                    cloudName={cloudName}
                                    publicId={image.imgId}
                                    className="rounded-md shadow-md hover:shadow-xl transform transition-transform hover:-translate-y-1 duration-200"
                                    loading="lazy"
                                >
                                    <Transformation height="600" />
                                    <Placeholder type="blur" />
                                </Image>
                            </a>
                        </Link>
                    </div>
                ))}
        </Masonry>
    );
}
