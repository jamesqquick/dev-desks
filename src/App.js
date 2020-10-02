import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import home from './pages/home';
import Navbar from './components/Navbar';
import Profile from './pages/profile';
import About from './pages/about.js';
import Random from './pages/random.js';
import PublicProfile from './components/PublicProfile';
import { ReactQueryDevtools } from 'react-query-devtools';
import { ImagesProvider } from './contexts/ImagesContext';

function App() {
    const { isLoading } = useAuth0();

    if (isLoading) return <p>Loading</p>;
    return (
        <div className="container mx-auto p-4 pb-6">
            <ImagesProvider>
                <ReactQueryDevtools initialIsOpen />
                <Navbar />

                <div className="max-w-6xl mx-auto">
                    <Switch>
                        <Route component={home} path="/" exact />
                        <Route component={About} path="/about" />
                        <Route component={Random} path="/random" />
                        <Route
                            path="/users/:username"
                            component={PublicProfile}
                        />
                        <Route path="/profile" component={Profile} />
                    </Switch>
                </div>
            </ImagesProvider>
        </div>
    );
}

export default App;
