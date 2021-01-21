import React from 'react';
import Skeleton from 'react-loading-skeleton';

export default function ProfilePlaceholder() {
    return (
        <div>
            <Skeleton height={500} className="mb-2" />
            <Skeleton height={30} className="mb-2" />
            <Skeleton height={30} />
        </div>
    );
}
