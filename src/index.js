import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Auth0Provider from './Auth0ProviderWithHistory';
import { BrowserRouter as Router } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from './components/AlertTemplate.js';
import './assets/main.css';

const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_RIGHT,
    timeout: 5000,
    // offset: '130px',
    // you can also just use 'scale'
    transition: transitions.SCALE,
};
ReactDOM.render(
    <AlertProvider template={AlertTemplate} {...options}>
        <Router>
            <Auth0Provider>
                <App />
            </Auth0Provider>
        </Router>
    </AlertProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
