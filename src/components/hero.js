import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
export default function Hero() {
    const { loginWithRedirect, user, isLoading } = useAuth0();
    return (
        <div className="container my-12 md:mb-24">
            <h1 className=" md:text-6xl text-4xl mb-0 text-gray-900">
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
            {!user && !isLoading && (
                <button
                    onClick={loginWithRedirect}
                    className="inline-block uppercase mr-2 text-sm px-4 py-3 rounded-md bg-accent-green-700 text-white  border-b-2 hover:border-b-2 hover:border-accent-green-900"
                >
                    Share Your Setup
                </button>
            )}
        </div>
    );
}
