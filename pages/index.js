import Head from 'next/head';
import React from 'react';
import ImageGallery from '../components/ImageGallery';
import Hero from '../components/hero.js';
import useImages from '../hooks/UseImages';

export default function Home() {
    const { images, error, loading } = useImages();
    return (
        <div>
            <Head>
                <title>Dev Desk</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Hero />
                {images && <ImageGallery images={images} />}
            </main>
        </div>
    );
}
