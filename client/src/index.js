import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import { store } from './reducers/index.js';
import ClientInfo from '../src/components/clientinfo/Clientinfo.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <ClientInfo />
        <App />
    </Provider>
);
