import '../styles/globals.css';
import Navbar from '../components/Navbar';
import AlertTemplate from '../components/AlertTemplate.js';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import { UserProvider } from '@auth0/nextjs-auth0';

const alertOptions = {
    position: positions.TOP_RIGHT,
    timeout: 5000,
    transition: transitions.SCALE,
};
function MyApp({ Component, pageProps }) {
    return (
        <div className="container mx-auto p-4 pb-6">
            <UserProvider>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Navbar />
                    <Component {...pageProps} />
                </AlertProvider>
            </UserProvider>
        </div>
    );
}

export default MyApp;
