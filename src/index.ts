import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);

import { Server } from 'socket.io';

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

interface User {
    id: string;
    name: string;
}

const users: User[] = [];
const rooms: Set<string>[] = [];

io.on('connection', async (socket) => {
    socket.join('room1');
    console.log('a user connected: ', socket.id, socket.rooms);
    console.log(await io.sockets.allSockets());
    socket.emit('connected', { id: socket.id });

    socket.on('chat message', (msg) => {
        console.log(`${socket.id} message: ` + msg);
        io.to('room1').emit(
            'broadcast message',
            `message from ${socket.id}: ${msg}`
        );
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3003, () => {
    console.log('listening on port 3003');
});
