import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './App';
import store from './store';
// Adding Bootstrap 4
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


const root = document.getElementById('root');
const provider = <Provider store={store}><App/></Provider>;

ReactDOM.render(provider, root);
registerServiceWorker();
