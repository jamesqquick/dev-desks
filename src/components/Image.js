import React from 'react';
import { Image, Transformation } from 'cloudinary-react';
import Placeholder from 'cloudinary-react/lib/components/Placeholder';

export default function MyImage({ publicId }) {
    return (
        <Image
            loading="lazy"
            publicId={publicId || 'dev_setups/placeholder-image_vcbif2'}
        >
            <Transformation width="800" crop="fill" />
            <Placeholder type="blur" />
        </Image>
    );
}
