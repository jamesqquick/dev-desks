import React from 'react';
import ProfileWrapper from './ProfileWrapper';
import { FaTwitter, FaExternalLinkAlt } from 'react-icons/fa';

export default function PublicProfile({ user }) {
    if (!user) return;

    return (
        <ProfileWrapper user={user}>
            <div className="flex">
                <a
                    className="mr-4"
                    href={`https://www.twitter.com/${user.username}`}
                >
                    <FaTwitter />
                </a>
                {user.usesLink && (
                    <a className="mr-2" href={user.usesLink}>
                        <FaExternalLinkAlt />
                    </a>
                )}
            </div>
        </ProfileWrapper>
    );
}
