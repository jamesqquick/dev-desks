import Head from 'next/head';
import EditProfile from '../components/EditProfile';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useProfile from '../hooks/UseProfile';

export default function LoggedInProfile() {
    const { profile, loading: loadingProfile } = useProfile();

    return (
        <div>
            <Head>
                <title>Profile</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>{!loadingProfile && <EditProfile profile={profile} />}</main>
        </div>
    );
}

export const getServerSideProps = withPageAuthRequired();
