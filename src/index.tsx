import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

async function setupAnalytics() {
  if (process.env.NODE_ENV === 'production') {
    const ReactGA = await import('react-ga');
    ReactGA.initialize('UA-73066517-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
}
setupAnalytics();
