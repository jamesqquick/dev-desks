import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useAuth0 } from './utils/auth';
import './App.css';
import home from './pages/home';
import profile from './pages/profile';
import PublicProfile from './pages/publicProfile';
import Navbar from './components/Navbar';
function App() {
    return (
        <Router>
            <div className="container ">
                <h1 className="my-5 title text-center display-1">Dev Setups</h1>
                <Navbar />

                <Switch>
                    <Route component={home} path="/" exact />
                    <Route component={profile} path="/profile" />
                    <Route path="/users/:username" component={PublicProfile} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
