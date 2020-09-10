import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import EditProfile from '../components/EditProfile';
import { getSavedUser, getLoggedInUser } from '../utils/queries.js';
import { useQuery, queryCache } from 'react-query';

export default function Profile() {
    const { user: loggedInUser, getAccessTokenSilently } = useAuth0();
    const { isLoading, error, data: savedUser } = useQuery(
        `fetchLoggedInUser:${loggedInUser.nickname}`,
        async () => {
            const token = await getAccessTokenSilently();
            return getLoggedInUser(token);
        },
        {
            refetchOnWindowFocus: false,
        }
    );

    const profileUpdated = () => {
        // loadUser();
        queryCache.invalidateQueries(
            `fetchLoggedInUser:${loggedInUser.nickname}`
        );
    };

    if (savedUser) {
        return (
            <>
                <EditProfile user={savedUser} profileUpdated={profileUpdated} />
            </>
        );
    }
    return null;
}
