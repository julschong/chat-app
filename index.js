const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home.ejs');
});

io.on('connection', (socket) => {
    console.log('a user connected: ', socket.id, socket.rooms);
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3003, () => {
    console.log('listening on *:3003');
});
