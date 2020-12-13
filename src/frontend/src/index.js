import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import Store, { saga } from './Store/Store';
import * as serviceWorker from './serviceWorker';
import mySaga from './sagas';
import { Provider } from 'react-redux';
/**
 * TODO:
 * Create store here with saga middleware
 */
ReactDOM.render(<Provider store={Store}><App /></Provider>, document.getElementById('root'));

saga.run(mySaga); 

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
