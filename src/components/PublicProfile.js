import React from 'react';
import { useQuery } from 'react-query';
import { getSavedUser } from '../utils/queries.js';
import { Redirect } from 'react-router-dom';
import Profile from "./Profile"

export default function PublicProfile({ match: { params } }) {
    const { isLoading, error, data: savedUser } = useQuery(
        `fetchUser:${params.username}`,
        () => getSavedUser(params.username),
        {
            refetchOnWindowFocus: false,
            retry: false,
        }
    );

    if (isLoading) return <p>Loading...</p>;

    if (!savedUser || error) {
        console.log('didnt get a user');
        return <Redirect to="/" />;
    }

    return <Profile user={savedUser} />
}
