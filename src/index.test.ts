import { Socket } from 'socket.io';

import { createServer, Server as hpServer } from 'http';
import { Server } from 'socket.io';
import { Socket as ClientSocket, io as ClientIO } from 'socket.io-client';
import { AddressInfo } from 'net';
import { LoginMessage, userLogin } from './socketEvents/socketActions';
import { users, User } from './_data/user';
let io: Server,
    serverSocket: Socket,
    clientSocket: ClientSocket,
    httpServer: hpServer;

beforeAll((done) => {
    httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
        const port = (httpServer.address() as AddressInfo).port;
        clientSocket = ClientIO(`http://localhost:${port}`);
        io.on('connection', (socket) => {
            serverSocket = socket;
        });
        clientSocket.on('connect', done);
    });
});

describe('my awesome project', () => {
    test('should work', (done) => {
        clientSocket.on('hello', (arg) => {
            expect(arg).toBe('world');
            done();
        });
        serverSocket.emit('hello', 'world');
    });

    test('should work (with ack)', (done) => {
        serverSocket.on('hi', (cb) => {
            cb('hola');
        });
        clientSocket.emit('hi', (arg: unknown) => {
            expect(arg).toBe('hola');
            done();
        });
    });
});

describe('my test', () => {
    test('testing', (done) => {
        const loginData: LoginMessage = {
            id: '1',
            name: 'Julius'
        };

        serverSocket.on('login', async function (loginData: LoginMessage) {
            await userLogin(loginData, serverSocket);
            expect(users).toHaveLength(1);
            expect(Object.keys(users[0])).toContain('clientId');
            expect(Object.keys(users[0])).toContain('name');
            expect(Object.keys(users[0])).toContain('currentRoom');
            expect(Object.keys(users[0])).toContain('serverId');
            done();
        });
        clientSocket.emit('login', loginData);
    });
});

afterAll(() => {
    io.close();
    clientSocket.close();
});
