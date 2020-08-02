import React from 'react';
export default function ImageCard({ data }) {
    return (
        <img
            src={`https://res.cloudinary.com/jamesqquick/image/upload/c_fit,h_300,w_300/v1590263524/${data.imgId}`}
            alt={'Setup ' + data.id}
        />
    );
}
