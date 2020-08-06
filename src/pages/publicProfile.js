import React, { useEffect, useState } from 'react';
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
            <h2>{params.username}</h2>
            <a href={`https://www.twitter.com/${params.username}`}>
                @{params.username}
            </a>
            <p>
                {user && user.usesLink && <a href={user.usesLink}>Uses Page</a>}
            </p>
            {user && (
                <div>
                    <div></div>
                    <Image cloudName="jamesqquick" publicId={user.imgId}>
                        <Transformation width="800" crop="fill" />
                    </Image>
                </div>
            )}
            {!user && <img src="/placeholder-image.png" alt="profile"></img>}
        </>
    );
}
