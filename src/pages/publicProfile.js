import React, { useEffect } from 'react';
import { useState } from 'react';
import { Image, Transformation } from 'cloudinary-react';

export default function PublicProfile({ match }) {
    const { params } = match;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const res = await fetch(
                    `/.netlify/functions/getUser?username=${params.username}`
                );
                const data = await res.json();
                setUser(data);
            } catch (err) {
                console.error(err);
            }
        };
        loadUser();
    }, [params]);

    return (
        <>
            {user && (
                <div>
                    <div className="text-center">
                        <h1 className="my-5 title text-center display-1">
                            {user.username}
                        </h1>
                        <Image
                            cloudName="jamesqquick"
                            publicId={user.imgId}
                            height="150"
                        >
                            <Transformation
                                width="150"
                                height="150"
                                crop="fill"
                            />
                        </Image>
                        <div>
                            <a
                                href={`https://www.twitter.com/${user.username}`}
                            >
                                Twitter
                            </a>
                            {user.usesLink && (
                                <a href={user.usesLink}>
                                    {user.username} uses page
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
