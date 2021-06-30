import { Socket } from 'socket.io';

import { createServer, METHODS, Server as hpServer } from 'http';
import { Server } from 'socket.io';
import { Socket as ClientSocket, io as ClientIO } from 'socket.io-client';
import { AddressInfo } from 'net';
import {
    broadcast,
    getActiveRooms,
    joinNewRoom,
    LoginMessage,
    userDisconnect,
    userLogin
} from './socketActions';
import { users } from '../_data/user';
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

describe('login', () => {
    const loginData: LoginMessage = {
        id: '1',
        name: 'Julius'
    };
    afterEach(() => {
        users.splice(0, users.length);
    });

    test('user should be added to users as User type', (done) => {
        serverSocket.on('login', async function (loginData: LoginMessage) {
            await userLogin.apply(serverSocket, [loginData]);
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

describe('userDisconnect action', () => {
    const loginData: LoginMessage = {
        id: '1',
        name: 'Julius'
    };
    afterEach(() => {
        users.splice(0, users.length);
        clientSocket.connect();
    });
    test('user should be removed from users after disconnect', (done) => {
        users.push({
            clientId: loginData.id,
            name: loginData.name,
            currentRoom: 'global',
            serverId: serverSocket.id
        });
        serverSocket.on('disconnect', async function () {
            userDisconnect();
            expect(users).toHaveLength(0);
            done();
        });

        clientSocket.disconnect();
    });
});

describe('getActiveRooms', () => {
    beforeAll(() => {
        serverSocket.join('room 1');
        serverSocket.join('room 2');
        serverSocket.join('room 3');
    });
    test('return a list of all active rooms (with sockets) besides the room of its own id', (done) => {
        clientSocket.on('get-active-rooms', (rooms) => {});
        expect(getActiveRooms(io.sockets.adapter.rooms)).toEqual([
            'room 1',
            'room 2',
            'room 3'
        ]);
        done();
    });
    afterAll(() => {
        serverSocket.leave('room 1');
        serverSocket.leave('room 2');
        serverSocket.leave('room 3');
    });
});

describe('joinNewRoom', () => {
    const loginData: LoginMessage = {
        id: '1',
        name: 'Julius'
    };
    beforeAll(async () => {
        serverSocket.join('test');
        await userLogin.apply(serverSocket, [loginData]);
        serverSocket.leave('global');
    });
    test('user should join new room and leave test room', (done) => {
        joinNewRoom.apply(serverSocket, ['test', 'new test']).then(() => {
            expect(getActiveRooms(io.sockets.adapter.rooms)).toEqual([
                'new test'
            ]);
            done();
        });
    });

    afterAll(() => {
        users.splice(0, users.length);
    });
});

afterAll(() => {
    io.close();
    clientSocket.close();
});
