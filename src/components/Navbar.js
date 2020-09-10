import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
export default function MyNavbar() {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
    const [navbarOpen, setNavbarOpen] = React.useState(false);

    return (
        <nav className="lg:flex block items-center justify-between flex-wrap  p-6 mb-4 relative">
            <div className="flex items-center flex-shrink-0  mr-6">
                <Link to="/" className="font-semibold text-xl tracking-tight">
                    <img
                        className="h-10 w-auto"
                        src={logo}
                        alt="Dev Setups Logo"
                    />
                </Link>
            </div>
            <div class="block lg:hidden absolute top-0 right-0 mt-6 mr-5">
                <button
                    class="flex items-center  px-3 py-2  rounded  "
                    onClick={() => setNavbarOpen(!navbarOpen)}
                >
                    <svg
                        class="fill-current h-5 w-5"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div
                className={
                    'lg:flex flex-grow items-center' +
                    (navbarOpen ? ' flex' : ' hidden')
                }
            >
                <div className="text-sm lg:flex-grow"></div>
                <div>
                    <Link
                        to="/about"
                        className="block mt-4 lg:inline-block lg:mt-0  mr-4 mb-5 lg:mg-0"
                    >
                        About
                    </Link>
                    {!isAuthenticated && (
                        <button
                            onClick={loginWithRedirect}
                            className="inline-block text-sm px-4 py-2 rounded bg-blue-500 text-white  hover:bg-blue-600 mb-5 lg:mg-0"
                        >
                            Login
                        </button>
                    )}
                    {isAuthenticated && (
                        <>
                            <Link
                                to={`/profile`}
                                className="block mt-4 lg:inline-block lg:mt-0  mr-4 mb-5 lg:mg-0"
                            >
                                Profile
                            </Link>
                            <button
                                onClick={() =>
                                    logout({ returnTo: window.location.origin })
                                }
                                className="inline-block text-sm px-4 py-2 rounded bg-blue-500 text-white  hover:bg-blue-600 mb-5 lg:mg-0"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
