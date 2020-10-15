import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import EditProfile from '../components/EditProfile';
import { getLoggedInUser } from '../utils/queries.js';
import { useQuery, queryCache } from 'react-query';
import { useAlert } from 'react-alert';

export default function Profile() {
    const { user: loggedInUser, getAccessTokenSilently } = useAuth0();
    const alert = useAlert();

    const { data: savedUser } = useQuery(
        `fetchLoggedInUser:${loggedInUser.nickname}`,
        async () => {
            const token = await getAccessTokenSilently();
            return getLoggedInUser(token);
        },
        {
            refetchOnWindowFocus: false,
        }
    );

    const profileUpdated = (msg) => {
        queryCache.invalidateQueries(
            `fetchLoggedInUser:${loggedInUser.nickname}`
        );
        alert.show(msg || 'User profile successfully updated', {
            type: 'success',
        });
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
