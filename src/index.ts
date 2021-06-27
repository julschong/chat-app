import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors);
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

    socket.on('login', (msg) => {
        if (!msg) {
            return socket.emit('connected', { id: `GUEST(${socket.id})` });
        }
        socket.emit('connected', { id: msg });
    });

    socket.on('chat message', (msg) => {
        io.to('room1').emit(
            'broadcast message',
            `${msg.user.name}: ${msg.message}`
        );
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3003, () => {
    console.log('listening on port 3003');
});
