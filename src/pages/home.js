import React from 'react';
import ImageGallery from '../components/ImageGallery';
import Hero from '../components/hero.js';
export default function home() {
    return (
        <div>
            <Hero />
            <ImageGallery />
            <p className="text-center my-5">
                You’ve reached the end :) Add your setup if you haven’t yet!
            </p>
        </div>
    );
}
