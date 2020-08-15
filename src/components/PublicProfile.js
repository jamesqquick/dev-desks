import React from 'react';
import ProfileWrapper from './ProfileWrapper';

export default function PublicProfile({ user }) {
    if (!user) return;

    return (
        <ProfileWrapper user={user}>
            <h1 className="card-title text-center mb-4">{user.username}</h1>
            <p className="mb-1">
                Twitter:{' '}
                <a href={`https://www.twitter.com/${user.username}`}>
                    @{user.username}
                </a>
            </p>

            {user.usesLink && (
                <p>
                    Uses Page: <a href={user.usesLink}>{user.usesLink}</a>
                </p>
            )}
        </ProfileWrapper>
    );
}
