import React, { useEffect, useState } from 'react';
import { Image, Transformation, Placeholder } from 'cloudinary-react';
import { Link } from 'react-router-dom';

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
                    <Link to={`/users/${user.username}`} key={index}>
                        <Image
                            cloudName={
                                process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
                            }
                            publicId={user.imgId}
                            className="gallery-img"
                            loading="lazy"
                        >
                            <Transformation
                                width="200"
                                height="200"
                                crop="fill"
                            />
                            <Placeholder type="blur" />
                        </Image>
                    </Link>
                ))}
        </div>
    );
}
