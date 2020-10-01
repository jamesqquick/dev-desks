import React from "react"
import {useQuery} from "react-query"
import {getRandomUser} from "../utils/queries"
import { Redirect } from 'react-router-dom'
import Profile from "../components/Profile"

const Random = () => {
    const { isLoading, error, data: randomUser } = useQuery(
        "fetchRandomUser",
        getRandomUser,
        {
            refetchOnWindowFocus: false,
            retry: false,
        }
    );

    if (isLoading) return <p>Loading...</p>;

    if (!randomUser || error) {
        console.log('didnt get a user');
        return <Redirect to="/" />;
    }

    return <Profile user={randomUser} />
}

export default Random
