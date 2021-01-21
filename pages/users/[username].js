import Head from 'next/head';
const { getUser } = require('../../utils/airtable');

import Profile from '../../components/Profile';
export default function UserProfile({ dbUser }) {
    return (
        <div>
            <Head>
                <title>Dev Desk</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Profile user={dbUser} />
            </main>
        </div>
    );
}

export async function getServerSideProps({ params }) {
    const username = params.username;
    const dbUser = await getUser(username);

    if (!dbUser) {
        res.statusCode = 404;
        res.setHeader('Location', `/404`); // Replace <link> with your url link
        return { props: {} };
    }
    return { props: { dbUser } };
}
