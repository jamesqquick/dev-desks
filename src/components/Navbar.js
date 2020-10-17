import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
export default function MyNavbar() {
    const {
        loginWithRedirect,
        logout,
        isAuthenticated,
        isLoading,
    } = useAuth0();
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    return (
        <nav className="lg:flex block items-center justify-between flex-wrap  py-6 mb-4 relative">
            <div className="flex items-center flex-shrink-0  mr-6">
                <Link to="/" className="font-semibold text-xl tracking-tight">
                    <img
                        className="h-10 w-auto"
                        src={logo}
                        alt="Dev Setups Logo"
                    />
                </Link>
            </div>
            <div className="block lg:hidden absolute top-0 right-0 mt-6 mr-5">
                <button
                    className="flex items-center  px-3 py-2  rounded  "
                    onClick={() => setNavbarOpen(!navbarOpen)}
                >
                    <svg
                        className="fill-current h-5 w-5"
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
                    {/* <Link
                        to="/about"
                        className="block mt-4 text-lg lg:inline-block lg:mt-0  mr-4 mb-5 lg:mg-0 hover:border-b-4 border-accent-green-100"
                    >
                        About
                    </Link> */}
                    {!isAuthenticated && !isLoading && (
                        <button
                            onClick={loginWithRedirect}
                            className="inline-block uppercase mr-2 text-sm px-4 py-2 rounded-md bg-accent-green-700 text-white  border-b-2 hover:border-b-2 hover:border-accent-green-900"
                        >
                            Login
                        </button>
                    )}
                    {isAuthenticated && !isLoading && (
                        <>
                            <Link
                                to={`/profile`}
                                className="block mt-4 text-lg lg:inline-block lg:mt-0  mr-4 mb-5 lg:mg-0 border-b-4 border-transparent hover:border-accent-green-100"
                            >
                                Profile
                            </Link>
                            <button
                                onClick={() =>
                                    logout({ returnTo: window.location.origin })
                                }
                                className="inline-block uppercase mr-2 text-sm px-4 py-2 rounded-md bg-accent-green-700 text-white  border-b-2 hover:border-b-2 hover:border-accent-green-900"
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
