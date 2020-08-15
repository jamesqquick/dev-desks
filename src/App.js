import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import home from './pages/home';
import Navbar from './components/Navbar';
import Profile from './pages/profile';
function App() {
    const { isLoading } = useAuth0();

    if (isLoading) return <p>Loading</p>;
    return (
        <div className="container ">
            <h1 className="my-5 title text-center display-1">Dev Setups</h1>
            <Navbar />

            <Switch>
                <Route component={home} path="/" exact />
                <Route path="/users/:username" component={Profile} />
            </Switch>
        </div>
    );
}

export default App;
