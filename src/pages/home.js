import React, { useContext } from 'react';
import ImageGallery from '../components/ImageGallery';
import Hero from '../components/hero.js';
import { ImagesContext } from '../contexts/ImagesContext';

export default function Home() {
    const { images } = useContext(ImagesContext);
    return (
        <div>
            <Hero />
            {images && <ImageGallery images={images} />}
        </div>
    );
}
