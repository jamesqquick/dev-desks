import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import history from './utils/history';
import { Auth0Provider } from './utils/auth';
const onRedirectCallback = (appState) => {
    history.push(
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
};
const authConfig = {
    domain: 'whotofollow.auth0.com',
    clientId: 'wBjmBFe1Z3pUOGH1khKXyaM822VD6Zyw',
    audience: 'https://whotofollowapi/',
};
ReactDOM.render(
    <Auth0Provider
        domain={authConfig.domain}
        client_id={authConfig.clientId}
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
        audience={authConfig.audience}
    >
        <App />
    </Auth0Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
