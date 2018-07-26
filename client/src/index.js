import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import store from './store';

const root = document.getElementById('root');
ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, root);
registerServiceWorker();
