import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
export default function MyNavbar() {
    const {
        loginWithRedirect,
        logout,
        isAuthenticated,
        isLoading,
        user,
    } = useAuth0();

    return (
        <nav className="mb-5">
            <div className="nav-items d-flex justify-content-center align-items-center">
                <Link to="/" className="mr-2">
                    Home
                </Link>
                {!isLoading && !isAuthenticated && (
                    <button
                        className="btn btn-link"
                        onClick={loginWithRedirect}
                    >
                        Login
                    </button>
                )}
                {!isLoading && isAuthenticated && (
                    <>
                        <Link to={`/users/${user.nickname}`}>Profile</Link>
                        <button
                            className="btn btn-link"
                            onClick={() =>
                                logout({ returnTo: window.location.origin })
                            }
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
