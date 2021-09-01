import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { v4 } from 'uuid';

const SOCKET_URL =
    process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_LOCAL_URL
        : process.env.REACT_APP_BACKEND_URL;

export const SocketContext = createContext();
const socket = io.connect(SOCKET_URL);

export const SOCKET_EVENTS = Object.freeze({
    CREATE_NEW_ROOM: 'create-new-room',
    GET_ACTIVE_ROOMS: 'get-active-rooms',
    TOTAL_CHAT_ROOMS: 'total-chat-rooms',
    USERS_IN_ROOM: 'users-in-room',
    BROADCAST_MESSAGE: 'broadcast-message',
    LOGIN: 'login',
    LOGOUT: 'logout',
    SEND_CHAT: 'chat-message'
});

export const APP_STORAGE_KEY = 'chat-app-user';

export const SocketContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [currentRoom, setCurrentRoom] = useState('global');

    useEffect(() => {
        const storedUser = window.localStorage.getItem(APP_STORAGE_KEY);
        if (storedUser) {
            const storedUserJson = JSON.parse(storedUser);
            setUser(storedUserJson);
            socket.emit(SOCKET_EVENTS.LOGIN, storedUserJson);
        }
    }, []);

    // --------------Socket Emit Actions-------------------
    const newLogin = (name) => {
        if (!name) {
            return;
        }
        const newUser = {
            id: v4(),
            name
        };

        setUser(newUser);
        window.localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(newUser));
        socket.emit(SOCKET_EVENTS.LOGIN, newUser);
    };

    const joinRoom = (roomName) => {
        if (currentRoom === roomName) {
            return;
        }
        socket.emit(SOCKET_EVENTS.CREATE_NEW_ROOM, currentRoom, roomName);
        setCurrentRoom(roomName);
    };

    const createRoom = (newRoomInputRef) => {
        const newRoomName = newRoomInputRef.current.value.trim();
        if (newRoomName === '') {
            return;
        }

        socket.emit(SOCKET_EVENTS.CREATE_NEW_ROOM, currentRoom, newRoomName);
        setCurrentRoom(newRoomName);
        newRoomInputRef.current.value = '';
    };

    // ---------------------------------------------------------
    const store = {
        socket,
        user,
        setUser,
        newLogin,
        currentRoom,
        setCurrentRoom,
        joinRoom,
        createRoom
    };
    return (
        <SocketContext.Provider value={store}>
            {children}
        </SocketContext.Provider>
    );
};
