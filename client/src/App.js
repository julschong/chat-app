import { createContext, React } from 'react';
import { io } from 'socket.io-client';
import Trying from './MessageBox';

const SOCKET_URL = 'http://localhost:3003';
export const context = createContext();
export const socket = io(SOCKET_URL);

const App = () => {
    return (
        <context.Provider value={socket}>
            <Trying />
        </context.Provider>
    );
};

export default App;
