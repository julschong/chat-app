import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { v4 } from 'uuid';

const SOCKET_URL = 'http://192.168.5.194:3003/';
export const SocketContext = createContext();
const socket = io.connect(SOCKET_URL);

export const SocketContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [currentRoom, setCurrentRoom] = useState('global');

    useEffect(() => {
        const storedUser = window.localStorage.getItem('chat-app-user');
        if (storedUser) {
            const storedUserJson = JSON.parse(storedUser);
            setUser(storedUserJson);
            socket.emit('login', storedUserJson);
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
        socket.emit('login', newUser);
    };

    const store = {
        socket,
        user,
        setUser,
        newLogin,
        currentRoom,
        setCurrentRoom
    };
    return (
        <SocketContext.Provider value={store}>
            {children}
        </SocketContext.Provider>
    );
};
