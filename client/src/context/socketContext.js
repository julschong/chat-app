import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { v4 } from 'uuid';

const SOCKET_URL = 'http://192.168.5.194:3003/';
export const SocketContext = createContext();
const socket = io.connect(SOCKET_URL);

export const SocketContextProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const storedUser = window.localStorage.getItem('chat-app-user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const newLogin = (name) => {
        if (!name) {
            return;
        }
        const newUser = {
            id: v4(),
            name
        };

        setUser(newUser);
        window.localStorage.setItem('chat-app-user', JSON.stringify(newUser));
    };

    const store = { socket, user, setUser, newLogin };
    return (
        <SocketContext.Provider value={store}>
            {children}
        </SocketContext.Provider>
    );
};
