import auth0 from '../../utils/auth0';

export default async function login(req, res) {
    try {
        await auth0.handleLogin(req, res, {
            redirectTo: `${process.env.APPLICATION_DOMAIN}/api/callback`,
        });
    } catch (error) {
        console.error(error);
        res.status(error.status || 400).end(error.message);
    }
}
