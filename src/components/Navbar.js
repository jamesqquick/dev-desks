import React from 'react';
import { useAuth0 } from '../utils/auth';
import { Link } from 'react-router-dom';
export default function MyNavbar() {
    const {
        loginWithRedirect,
        logout,
        isAuthenticated,
        username,
        loading,
    } = useAuth0();

    return (
        <nav className="mb-5">
            <div className="nav-items d-flex justify-content-center align-items-center">
                <Link to="/" className="mr-2">
                    Home
                </Link>
                {!loading && !isAuthenticated && (
                    <button
                        className="btn btn-link"
                        onClick={loginWithRedirect}
                    >
                        Login
                    </button>
                )}
                {!loading && isAuthenticated && username && (
                    <>
                        <Link to="/profile">Profile</Link>
                        <button className="btn btn-link" onClick={logout}>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
