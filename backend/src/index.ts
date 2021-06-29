import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);

import { Server } from 'socket.io';
import {
    broadcast,
    getActiveRoomList,
    joinNewRoom,
    userDisconnect,
    userLogin
} from './socketEvents/socketActions';

export const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', async (socket) => {
    socket.on('create-new-room', joinNewRoom);
    socket.on('get-active-rooms', getActiveRoomList);
    socket.on('chat-message', broadcast);
    socket.on('login', userLogin);
    socket.on('disconnect', userDisconnect);
});

if (process.env.NODE_ENV !== 'test') {
    server.listen(3003, () => {
        console.log('listening on port 3003');
    });
}
