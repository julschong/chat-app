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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(cors_1.default);
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(app);
const socket_io_1 = require("socket.io");
const socketActions_1 = require("./utils/socketActions");
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
// interface User {
//     id: string;
//     name: string;
// }
exports.io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
    socket.join('global');
    console.log('a user connected: ', socket.id, socket.rooms);
    socket.on('create-new-room', (roomName) => __awaiter(void 0, void 0, void 0, function* () {
        if (!roomName || roomName.trim() === '') {
            return;
        }
        yield socket.join(roomName);
        socket.to(roomName).emit('new-user-joined', socket.id);
    }));
    socket.on('login', (msg) => {
        console.log(msg);
    });
    socket.on('chat message', socketActions_1.broadcast);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
}));
server.listen(3003, () => {
    console.log('listening on port 3003');
});
//# sourceMappingURL=index.js.map