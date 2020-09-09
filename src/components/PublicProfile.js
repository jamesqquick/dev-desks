import React from 'react';
import { FaTwitter, FaExternalLinkAlt } from 'react-icons/fa';
import { Transformation, Image } from 'cloudinary-react';
import { useQuery } from 'react-query';
import { getSavedUser } from '../utils/queries.js';

export default function PublicProfile({ match: { params } }) {
    const { isLoading, error, data: savedUser } = useQuery(
        `fetchUser:${params.username}`,
        () => getSavedUser(params.username),
        {
            refetchOnWindowFocus: false,
        }
    );

    console.log(isLoading, error, savedUser);
    if (isLoading) return <p>Loading...</p>;

    if (!savedUser) {
        console.log('didnt get a user');
    }

    return (
        <>
            <Image
                cloudName="jamesqquick"
                publicId={
                    savedUser.imgId || 'dev_setups/placeholder-image_vcbif2'
                }
                className="rounded-md shadow-lg mx-auto"
            >
                <Transformation width="800" crop="fill" />
            </Image>
            <h1 className="text-4xl my-4 text-center">@{savedUser.username}</h1>
            <p className="font-bold text-lg">About</p>
            <p className="my-2 ">{savedUser.description}</p>
            <div className="flex">
                <a
                    className="mr-4"
                    href={`https://www.twitter.com/${savedUser.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaTwitter />
                </a>
                {savedUser.usesLink && (
                    <a
                        className="mr-2"
                        href={savedUser.usesLink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaExternalLinkAlt />
                    </a>
                )}
            </div>
        </>
    );
}
