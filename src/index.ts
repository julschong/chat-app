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

const users: string[] = [];
const rooms: Set<string>[] = [];

io.on('connection', async (socket) => {
    socket.join('room1');
    console.log('a user connected: ', socket.id, socket.rooms);
    console.log(await io.sockets.allSockets());

    // users.push(socket.id);
    // rooms.push(socket.rooms);
    // console.log('users: ', users);
    // console.log('rooms: ', rooms);

    socket.on('chat message', (msg) => {
        console.log(`${socket.id} message: ` + msg);
        io.to('room1').emit(
            'broadcast message',
            `message from the server ${msg}`
        );
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3003, () => {
    console.log('listening on port 3003');
});
