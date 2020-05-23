import React from 'react';
import Upload from './components/Upload';
import ImageGallery from './components/ImageGallery';
import { useAuth0 } from './utils/auth';
import './App.css';
function App() {
    const {
        loginWithRedirect,
        logout,
        user,
        isAuthenticated,
        loading,
    } = useAuth0();

    if (loading) return <p>loading...</p>;
    return (
        <div className="container mt-4">
            {!isAuthenticated && (
                <button onClick={loginWithRedirect}>Login</button>
            )}
            {isAuthenticated && <button onClick={logout}>Logout</button>}
            {user && <p>Welcome, {user['http://whotofollow.com/handle']}</p>}
            {isAuthenticated && <Upload />}
            <ImageGallery />
        </div>
    );
}

export default App;
