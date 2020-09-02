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
        <nav className="flex items-center justify-between flex-wrap  p-6 mb-4">
            <div className="flex items-center flex-shrink-0  mr-6">
                <Link to="/" className="font-semibold text-xl tracking-tight">
                    DEV SETUPS
                </Link>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg
                        className="fill-current h-3 w-3"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow"></div>
                <div>
                    <Link
                        to="/about"
                        className="block mt-4 lg:inline-block lg:mt-0  mr-4"
                    >
                        About
                    </Link>
                    {!isAuthenticated && (
                        <button
                            onClick={loginWithRedirect}
                            className="inline-block text-sm px-4 py-2 rounded bg-blue-500 text-white  hover:bg-blue-600"
                        >
                            Login
                        </button>
                    )}
                    {isAuthenticated && (
                        <>
                            <Link
                                to={`/users/${user.nickname}`}
                                className="block mt-4 lg:inline-block lg:mt-0  mr-4"
                            >
                                Profile
                            </Link>
                            <button
                                onClick={() =>
                                    logout({ returnTo: window.location.origin })
                                }
                                className="inline-block text-sm px-4 py-2 rounded bg-blue-500 text-white  hover:bg-blue-600"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
            {/* <nav className="mb-5">
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
        </nav> */}
        </nav>
    );
}
