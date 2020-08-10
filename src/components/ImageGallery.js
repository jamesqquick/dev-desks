import React, { useEffect, useState } from 'react';
import { Image, Transformation } from 'cloudinary-react';

export default function ImageGallery() {
    const [users, setUsers] = useState(null);

    const loadUsers = async () => {
        try {
            const res = await fetch('/.netlify/functions/getUsers');
            const users = await res.json();
            setUsers(users);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadUsers();
    }, [setUsers]);

    return (
        <div className="image-gallery">
            {users &&
                users.map((user, index) => (
                    <a href={`/users/${user.username}`} key={index}>
                        <Image
                            cloudName="jamesqquick"
                            publicId={user.imgId}
                            className="gallery-img"
                        >
                            <Transformation
                                width="300"
                                height="300"
                                crop="fill"
                            />
                        </Image>
                    </a>
                ))}
        </div>
    );
}
