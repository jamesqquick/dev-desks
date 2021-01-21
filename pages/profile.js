import Head from 'next/head';
import React from 'react';
import auth0 from '../utils/auth0';
import EditProfile from '../components/EditProfile';
import { getUser } from '../utils/airtable';
import Router from 'next/router';
export default function LoggedInProfile({ user, dbUser }) {
    const profileUpdated = () => {
        Router.reload(window.location.pathname);
    };

    return (
        <div>
            <Head>
                <title>Profile</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <EditProfile user={dbUser} profileUpdated={profileUpdated} />
            </main>
        </div>
    );
}

export async function getServerSideProps({ req, res }) {
    try {
        const session = await auth0.getSession(req);

        if (!session || !session.user) {
            res.writeHead(302, {
                Location: '/api/login',
            });
            res.end();
            return;
        }
        const username = session.user['http://devsetups.com/handle'];
        const dbUser = await getUser(username);

        if (!dbUser) {
            return { props: { user: session.user, dbUser: {} } };
        }
        return { props: { user: session.user, dbUser } };
    } catch (err) {
        console.error(err);
        //TODO: what to do?
    }
}
