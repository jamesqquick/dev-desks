import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useAuth0 } from './utils/auth';
import './App.css';
import home from './pages/home';
import profile from './pages/profile';
import PublicProfile from './pages/publicProfile';
function App() {
    const { loading } = useAuth0();

    return (
        <Router>
            <div className="container ">
                {loading && <p>loading</p>}
                {!loading && (
                    <Switch>
                        <Route component={home} path="/" exact />
                        <Route component={profile} path="/profile" />
                        <Route
                            path="/users/:username"
                            component={PublicProfile}
                        />
                    </Switch>
                )}
            </div>
        </Router>
    );
}

export default App;
