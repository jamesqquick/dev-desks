import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import home from './pages/home';
import profile from './pages/profile';
import PublicProfile from './pages/publicProfile';
function App() {
    const { isLoading } = useAuth0();

    return (
        <div className="container ">
            {isLoading && <p>loading</p>}
            {!isLoading && (
                <Switch>
                    <Route component={home} path="/" exact />
                    <Route component={profile} path="/profile" />
                    <Route path="/users/:username" component={PublicProfile} />
                </Switch>
            )}
        </div>
    );
}

export default App;
