import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useAuth0 } from './utils/auth';
import './App.css';
import home from './pages/home';
import profile from './pages/profile';
import Navbar from './components/Navbar';
function App() {
    const { loading } = useAuth0();

    return (
        <Router>
            <div className="container ">
                <Navbar />
                {loading && <p>loading</p>}
                {!loading && (
                    <Switch>
                        <Route component={home} path="/" exact />
                        <Route component={profile} path="/profile" />
                    </Switch>
                )}
            </div>
        </Router>
    );
}

export default App;
