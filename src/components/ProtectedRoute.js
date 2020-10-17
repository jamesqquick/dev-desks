import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../components/Loading';

const ProtectedRoute = ({ component, ...args }) => {
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

export default ProtectedRoute;
