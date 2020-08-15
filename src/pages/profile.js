import React, { useEffect, useState, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import PublicProfile from '../components/PublicProfile';
import EditProfile from '../components/EditProfile';

export default function Profile({ match }) {
    const [savedUser, setSavedUser] = useState(null);
    const { isLoading, user: loggedInUser } = useAuth0();
    const { params } = match;
    const [showEdit, setShowEdit] = useState(false);

    const loadUser = useCallback(async () => {
        if (isLoading) return;
        const username = params.username;
        try {
            const res = await fetch(
                `/.netlify/functions/getUser?username=${username}`
            );
            const savedUser = await res.json();
            setSavedUser(savedUser);
        } catch (err) {
            console.error(err);
        }
    }, [isLoading, params.username]);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    const profileUpdated = () => {
        loadUser();
        setShowEdit(false);
    };

    if (savedUser) {
        return (
            <>
                {loggedInUser &&
                    !showEdit &&
                    savedUser &&
                    loggedInUser.nickname === savedUser.username && (
                        <button
                            className="btn btn-primary  mb-2"
                            onClick={() => setShowEdit(true)}
                        >
                            Edit
                        </button>
                    )}
                {showEdit && (
                    <button
                        className="btn btn-danger mb-2"
                        onClick={() => setShowEdit(false)}
                    >
                        Cancel
                    </button>
                )}
                {!showEdit && <PublicProfile user={savedUser} />}
                {showEdit && (
                    <EditProfile
                        user={savedUser}
                        profileUpdated={profileUpdated}
                    />
                )}
            </>
        );
    }
    return null;
}
