import React from 'react';
import { useQuery } from 'react-query';
import { getSavedUser } from '../utils/queries.js';
import { Redirect } from 'react-router-dom';
import Profile from './Profile';
import Loading from './Loading.js';

export default function PublicProfile({ match: { params } }) {
    const { isLoading, error, data: savedUser } = useQuery(
        `fetchUser:${params.username}`,
        () => getSavedUser(params.username),
        {
            refetchOnWindowFocus: false,
            retry: false,
        }
    );

    if (isLoading)
        return (
            <div className="mt-16">
                <Loading />
            </div>
        );

    if (!savedUser || error) {
        return <Redirect to="/" />;
    }

    return <Profile user={savedUser} />;
}
