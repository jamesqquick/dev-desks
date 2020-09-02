import React from 'react';
import { Image, Transformation, Placeholder } from 'cloudinary-react';
import { ReactComponent as HeroDesk } from '../assets/desk-illustration.svg';

export default function hero() {
    return (
        <div className="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24">
            <div className="flex flex-col w-full lg:w-1/2 justify-center items-start pt-12 pb-24 px-6">
                <h1 className="font-bold text-3xl my-4">
                    Where Developers Share Their Setups
                </h1>
                <p className="leading-normal mb-4">
                    See what equipment other developers are using in their
                    day-to-day life.
                </p>
                <div className="flex">
                    <button className="inline-block mr-2 text-sm px-4 py-2 rounded bg-blue-500 text-white  hover:bg-blue-600">
                        Share Your Setup
                    </button>
                    <button className="bg-transparent hover:bg-gray-900 text-gray-900 hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-gray-900 hover:border-transparent">
                        Explore
                    </button>
                </div>
            </div>
            <div className="w-full lg:w-1/2 lg:py-6 text-center">
                <HeroDesk />
            </div>
        </div>
    );
}
