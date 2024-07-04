import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import { store } from './reducers/index.js';
import ClientInfoSender from './components/clientinfo/ClientInfoSender.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <ClientInfoSender />
        <App />
    </Provider>
);
