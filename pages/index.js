import Head from 'next/head';
import React from 'react';
import ImageGallery from '../components/ImageGallery';
import Hero from '../components/hero.js';
import { getImages } from '../utils/airtable';

export default function Home({ images }) {
    return (
        <div>
            <Head>
                <title>Dev Desk</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Hero />
                <ImageGallery images={images} />
            </main>
        </div>
    );
}

export async function getServerSideProps(context) {
    const images = await getImages(true);
    if (!images) {
        //TODO: throw an error
    }
    return {
        props: { images: images },
    };
}
