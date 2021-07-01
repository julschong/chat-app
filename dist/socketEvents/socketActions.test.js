"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const socket_io_client_1 = require("socket.io-client");
const socketActions_1 = require("./socketActions");
const user_1 = require("../_data/user");
let io, serverSocket, clientSocket, httpServer;
beforeAll((done) => {
    httpServer = http_1.createServer();
    io = new socket_io_1.Server(httpServer);
    httpServer.listen(() => {
        const port = httpServer.address().port;
        clientSocket = socket_io_client_1.io(`http://localhost:${port}`);
        io.on('connection', (socket) => {
            serverSocket = socket;
        });
        clientSocket.on('connect', done);
    });
});
describe('login', () => {
    const loginData = {
        id: '1',
        name: 'Julius'
    };
    afterEach(() => {
        user_1.users.splice(0, user_1.users.length);
    });
    test('user should be added to users as User type', (done) => {
        serverSocket.on('login', function (loginData) {
            return __awaiter(this, void 0, void 0, function* () {
                yield socketActions_1.userLogin.apply(serverSocket, [loginData]);
                expect(user_1.users).toHaveLength(1);
                expect(Object.keys(user_1.users[0])).toContain('clientId');
                expect(Object.keys(user_1.users[0])).toContain('name');
                expect(Object.keys(user_1.users[0])).toContain('currentRoom');
                expect(Object.keys(user_1.users[0])).toContain('serverId');
                done();
            });
        });
        clientSocket.emit('login', loginData);
    });
});
describe('userDisconnect action', () => {
    const loginData = {
        id: '1',
        name: 'Julius'
    };
    afterEach(() => {
        user_1.users.splice(0, user_1.users.length);
        clientSocket.connect();
    });
    test('user should be removed from users after disconnect', (done) => {
        user_1.users.push({
            clientId: loginData.id,
            name: loginData.name,
            currentRoom: 'global',
            serverId: serverSocket.id
        });
        serverSocket.on('disconnect', function () {
            return __awaiter(this, void 0, void 0, function* () {
                socketActions_1.userDisconnect();
                expect(user_1.users).toHaveLength(0);
                done();
            });
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
        clientSocket.on('get-active-rooms', (rooms) => { });
        expect(socketActions_1.getActiveRooms(io.sockets.adapter.rooms)).toEqual([
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
    const loginData = {
        id: '1',
        name: 'Julius'
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        serverSocket.join('test');
        yield socketActions_1.userLogin.apply(serverSocket, [loginData]);
        serverSocket.leave('global');
    }));
    test('user should join new room and leave test room', (done) => {
        socketActions_1.joinNewRoom.apply(serverSocket, ['test', 'new test']).then(() => {
            expect(socketActions_1.getActiveRooms(io.sockets.adapter.rooms)).toEqual([
                'new test'
            ]);
            done();
        });
    });
    afterAll(() => {
        user_1.users.splice(0, user_1.users.length);
    });
});
afterAll(() => {
    io.close();
    clientSocket.close();
});
//# sourceMappingURL=socketActions.test.js.map