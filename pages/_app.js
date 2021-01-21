import '../styles/globals.css';
import Navbar from '../components/Navbar';
import AlertTemplate from '../components/AlertTemplate.js';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';

const alertOptions = {
    position: positions.TOP_RIGHT,
    timeout: 5000,
    transition: transitions.SCALE,
};
function MyApp({ Component, pageProps }) {
    return (
        <div className="container mx-auto p-4 pb-6">
            <AlertProvider template={AlertTemplate} {...alertOptions}>
                <Navbar />
                <Component {...pageProps} />
            </AlertProvider>
        </div>
    );
}

export default MyApp;
