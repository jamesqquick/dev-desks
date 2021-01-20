import React from 'react';
import Skeleton from 'react-loading-skeleton';

export default function GalleryPlaceholder() {
    const nums = [1, 2, 3, 4, 5];

    return (
        <div className="gap-4  grid sm:grid-cols-2 md:grid-cols-3 xs:block">
            {nums.map((i) => (
                <Skeleton key={i} height={300} />
            ))}
        </div>
    );
}
