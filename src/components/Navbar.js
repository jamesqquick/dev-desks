import React from 'react';
import { useAuth0 } from '../utils/auth';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const {
        loginWithRedirect,
        logout,
        user,
        isAuthenticated,
        loading,
    } = useAuth0();
    return (
        <div>
            <nav className="navbar navbar-light bg-light mt-3 mb-5">
                <span className="navbar-brand mb-0 h1">Dev Setups</span>

                <ul className="navbar-nav flex-row">
                    <li className="nav-item active mr-3">
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </li>
                    {isAuthenticated && (
                        <>
                            <li className="nav-item active mr-3">
                                <Link className="nav-link" to="/profile">
                                    Profile
                                </Link>
                            </li>
                            <li className="nav-item active mr-3">
                                <button
                                    className="btn btn-primary my-2 my-sm-0"
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                    {!isAuthenticated && (
                        <li className="nav-item active mr-3">
                            <button
                                className="btn btn-primary my-2 my-sm-0"
                                onClick={loginWithRedirect}
                            >
                                Login
                            </button>
                        </li>
                    )}
                </ul>
                {/* {user && (
                    <p>Welcome, {user['http://whotofollow.com/handle']}</p>
                )} */}
            </nav>
        </div>
    );
}
