import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors);
import http from 'http';
const server = http.createServer(app);

import { Server } from 'socket.io';
import { broadcast } from './utils/socketActions';

export const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// interface User {
//     id: string;
//     name: string;
// }

io.on('connection', async (socket) => {
    socket.join('global');
    console.log('a user connected: ', socket.id, socket.rooms);

    socket.on('create-new-room', async (roomName) => {
        if (!roomName || roomName.trim() === '') {
            return;
        }
        await socket.join(roomName);
        socket.to(roomName).emit('new-user-joined', socket.id);
    });

    socket.on('login', (msg) => {
        console.log(msg);
    });

    socket.on('chat message', broadcast);

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3003, () => {
    console.log('listening on port 3003');
});
