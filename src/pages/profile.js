import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import EditProfile from '../components/EditProfile';
import { getSavedUser } from '../utils/queries.js';
import { useQuery } from 'react-query';

export default function Profile() {
    const { user: loggedInUser } = useAuth0();
    const { isLoading, error, data: savedUser } = useQuery(
        `fetchUser:${loggedInUser.nickname}`,
        () => getSavedUser(loggedInUser.nickname),
        {
            refetchOnWindowFocus: false,
        }
    );

    const profileUpdated = () => {
        // loadUser();
    };

    if (savedUser) {
        return (
            <>
                <h1 className="text-4xl my-4 text-center">
                    @{savedUser.username}
                </h1>
                <EditProfile user={savedUser} profileUpdated={profileUpdated} />
            </>
        );
    }
    return null;
}
