import { Socket } from 'socket.io';

import { createServer } from 'http';
import { Server } from 'socket.io';
import { Socket as ClientSocket, io as ClientIO } from 'socket.io-client';
import { AddressInfo } from 'net';

describe('my awesome project', () => {
    let io: Server, serverSocket: Socket, clientSocket: ClientSocket;

    beforeAll((done) => {
        const httpServer = createServer();
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

    afterAll(() => {
        io.close();
        clientSocket.close();
    });

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
