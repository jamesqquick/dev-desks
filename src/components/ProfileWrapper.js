import React from 'react';
import { Transformation, Image } from 'cloudinary-react';

export default function ProfileWrapper({ user, imageClicked, children }) {
    return (
        <div>
            <p className="font-bold text-lg">About</p>
            <p className="my-2 ">{user.description}</p>

            {children}
        </div>
    );
}
