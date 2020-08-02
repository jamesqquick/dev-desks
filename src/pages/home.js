import React from 'react';
import ImageGallery from '../components/ImageGallery';
import Navbar from '../components/Navbar';

export default function home() {
    return (
        <div>
            <h1 className="my-5 title text-center display-1">Dev Setups</h1>
            <Navbar />
            <ImageGallery />
        </div>
    );
}
