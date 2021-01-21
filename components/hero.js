import React from 'react';
export default function Hero() {
    return (
        <div className="container my-12 md:mb-24">
            <h1 className=" md:text-6xl text-4xl mb-4 text-gray-900">
                Where{' '}
                <span className="bg-accent-green-700 px-2 text-green-100 rounded-sm uppercase font-bold">
                    Devs
                </span>{' '}
                Share{' '}
                <span className="bg-accent-green-700 px-2 text-green-100 rounded-sm uppercase font-bold">
                    Desks
                </span>
            </h1>
            <p className="leading-normal text-xl md:text-2xl font-light mb-6 text-gray-800">
                See what equipment developers from across the world are using.
            </p>
        </div>
    );
}
