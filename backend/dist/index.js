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
app.use(cors_1.default());
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(app);
const socket_io_1 = require("socket.io");
const socketActions_1 = require("./socketEvents/socketActions");
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: 'https://jc-chat-app.netlify.app',
        methods: ['GET', 'POST']
    }
});
exports.io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
    socket.on('create-new-room', socketActions_1.joinNewRoom);
    socket.on('get-active-rooms', socketActions_1.getActiveRoomList);
    socket.on('chat-message', socketActions_1.broadcast);
    socket.on('login', socketActions_1.userLogin);
    socket.on('disconnect', socketActions_1.userDisconnect);
}));
if (process.env.NODE_ENV !== 'test') {
    server.listen(process.env.PORT, () => {
        console.log(`listening on port ${process.env.PORT}`);
    });
}
//# sourceMappingURL=index.js.map