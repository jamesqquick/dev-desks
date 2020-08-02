import React from 'react';
import { useAuth0 } from '../utils/auth';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
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
            <div className="nav-items d-flex justify-content-center ">
                {!loading && !isAuthenticated && (
                    <Button variant="primary" onClick={loginWithRedirect}>
                        Login
                    </Button>
                )}
                {!loading && isAuthenticated && username && (
                    <>
                        <Link to="/">Home</Link>

                        <Link to="profile">Profile</Link>
                        <Button variant="primary" onClick={logout}>
                            Logout
                        </Button>
                    </>
                )}
            </div>
        </nav>
    );
}
