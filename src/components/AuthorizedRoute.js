import React from 'react';
import { Route } from 'react-router-dom';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../components/Loading';
import { useHistory } from 'react-router-dom';

const AuthorizedRoute = ({ component, permission, ...args }) => {
    const { user, isLoading, isAuthenticated } = useAuth0();
    const history = useHistory();
    if (isLoading) return <Loading />;

    if (!isAuthenticated || !user) history.push('/');

    const namespace = process.env.REACT_APP_AUTH0_NAMESPACE;
    const userRoles = user[namespace + 'roles'];
    if (!userRoles?.includes(permission)) {
        history.push('/');
        return null;
    }

    return (
        <Route
            component={withAuthenticationRequired(component, {
                onRedirecting: () => (
                    <div className="mt-16">
                        <Loading />
                    </div>
                ),
            })}
            {...args}
        />
    );
};

export default AuthorizedRoute;
