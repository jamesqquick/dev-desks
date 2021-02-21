import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default function dashboard({}) {
    return (
        <div>
            <h1>Unapproved Images</h1>
        </div>
    );
}

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {
        const { user } = await getSession(ctx.req);
        console.log(user);
    },
});
