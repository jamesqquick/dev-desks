import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import history from './utils/history';
import { Auth0Provider } from '@auth0/auth0-react';
import authConfig from './authConfig';

// This function seems to tie into the prop down below
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={authConfig.domain}
    client_id={authConfig.clientId}
    redirectUri={window.location.origin}
    onRedirectCallback={onRedirectCallback} // What does this do?
    audience={authConfig.audience}>
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
