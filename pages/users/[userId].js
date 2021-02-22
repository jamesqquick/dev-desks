import Head from 'next/head';
const {
    getProfileBySub,
    getProfileByTwitterUsername,
} = require('../../utils/airtable');

import Profile from '../../components/Profile';
export default function UserProfile({ userProfile }) {
    return (
        <div>
            <Head>
                <title>Dev Desk</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Profile user={userProfile} />
            </main>
        </div>
    );
}

export async function getServerSideProps({ params, res }) {
    const userId = params.userId;
    let userProfile = await getProfileBySub(userId);

    if (!userProfile) {
        //fallback to querying by twitter handle for now
        userProfile = await getProfileByTwitterUsername(userId);

        if (!userProfile) {
            res.statusCode = 404;
            res.setHeader('Location', `/404`);
            return { props: {} };
        }
    }
    return { props: { userProfile } };
}
