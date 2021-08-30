import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());

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
    console.log(process.env.PORT);
    server.listen(process.env.PORT, () => {
        console.log(`listening on port ${process.env.PORT}`);
    });
}
