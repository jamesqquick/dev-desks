import React from 'react';
import Link from 'next/link';
import Logo from '../assets/logo.svg';
import { useUser } from '@auth0/nextjs-auth0';
export default function MyNavbar() {
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    const { user, isLoading } = useUser();

    return (
        <nav className="lg:flex block items-center justify-between flex-wrap  py-6 mb-4 relative">
            <div className="flex items-center flex-shrink-0  mr-6">
                <Link href="/" className="font-semibold text-xl tracking-tight">
                    <a>
                        <Logo className="h-10 w-auto" />
                    </a>
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
                <div className="space-x-4">
                    {/* <Link
                        to="/about"
                        className="block mt-4 text-lg lg:inline-block lg:mt-0  mr-4 mb-5 lg:mg-0 hover:border-b-4 border-accent-green-100"
                    >
                        About
                    </Link> */}
                    {!isLoading && !user && (
                        <a
                            href="/api/auth/login"
                            className="inline-block uppercase mr-2 text-sm px-4 py-2 rounded-md bg-accent-green-700 text-white  border-b-2 hover:border-b-2 hover:border-accent-green-900"
                        >
                            Login
                        </a>
                    )}
                    {!isLoading && user && (
                        <>
                            <Link
                                href={`/profile`}
                                className="block mt-4 text-lg lg:inline-block lg:mt-0  mr-4 mb-5 lg:mg-0 border-b-4 border-transparent hover:border-accent-green-100"
                            >
                                <a>My Profile</a>
                            </Link>
                            <Link href={`/api/auth/logout`}>
                                <a className="inline-block uppercase mr-2 text-sm px-4 py-2 rounded-md bg-accent-green-700 text-white  border-b-2 hover:border-b-2 hover:border-accent-green-900">
                                    Logout
                                </a>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
