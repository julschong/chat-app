import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import { SocketContextProvider } from './context/socketContext';

ReactDOM.render(
    <SocketContextProvider>
        <App />
    </SocketContextProvider>,
    document.getElementById('root')
);
