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
exports.userLogin = exports.userDisconnect = exports.getActiveRoomList = exports.joinNewRoom = exports.broadcast = void 0;
const index_1 = require("../index");
const user_1 = require("./../_data/user");
function broadcast(msg) {
    const thisUser = user_1.users.find((user) => user.serverId === this.id);
    if (!thisUser) {
        console.log(thisUser);
        return;
    }
    this.to(thisUser.currentRoom).emit('broadcast-message', msg.user.id, msg.user.name, msg.message);
}
exports.broadcast = broadcast;
/**
 * This function is called when user emits 'create-new-room' from client socket
 * user socket leaves the oldroom and create and join new room
 * if new room already existed, it will not create newRoom (Socket Rooms are in a Set)
 * @param  {string} oldRoomName
 * @param  {string} roomName
 */
function joinNewRoom(oldRoomName, roomName) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!roomName || roomName.trim() === '') {
            return;
        }
        // *this* here references to the socket that is using this callback
        yield this.leave(oldRoomName);
        yield this.join(roomName);
        const userIndex = user_1.users.findIndex((user) => user.serverId === this.id);
        const user = Object.assign(Object.assign({}, user_1.users[userIndex]), { currentRoom: roomName });
        user_1.users.splice(userIndex, 1);
        user_1.users.push(user);
        index_1.io.to(roomName).emit('broadcast-message', '1', 'server', 'new user has joined');
        const newRoomRes = yield index_1.io.in(roomName).fetchSockets();
        const newRoomUsers = newRoomRes.map((user) => user.id);
        index_1.io.to(roomName).emit('users-in-room', newRoomUsers);
        index_1.io.to(oldRoomName).emit('broadcast-message', '1', 'server', 'new user has left');
        const oldRoomRes = yield index_1.io.in(oldRoomName).fetchSockets();
        const oldRoomUsers = oldRoomRes.map((user) => user.id);
        index_1.io.to(oldRoomName).emit('users-in-room', oldRoomUsers);
        index_1.io.emit('get-active-rooms', getActiveRooms(index_1.io.sockets.adapter.rooms));
    });
}
exports.joinNewRoom = joinNewRoom;
function getActiveRoomList() {
    return __awaiter(this, void 0, void 0, function* () {
        this.emit('get-active-rooms', getActiveRooms(index_1.io.sockets.adapter.rooms));
    });
}
exports.getActiveRoomList = getActiveRoomList;
function getActiveRooms(dataFromIoSocketsAdapeterRooms) {
    // Convert map into 2D list:
    // ==> [['4ziBKG9XFS06NdtVAAAH', Set(1)], ['room1', Set(2)], ...]
    const arr = Array.from(dataFromIoSocketsAdapeterRooms);
    // Filter rooms whose name exist in set:
    // ==> [['room1', Set(2)], ['room2', Set(2)]]
    const filtered = arr.filter((room) => !room[1].has(room[0]) && room[0] !== 'global');
    // Return only the room name:
    // ==> ['room1', 'room2']
    const res = filtered.map((i) => i[0]);
    return res;
}
function userDisconnect() {
    return __awaiter(this, void 0, void 0, function* () {
        const id = user_1.users.findIndex((user) => user.serverId === this.id);
        user_1.users.splice(id, 1);
    });
}
exports.userDisconnect = userDisconnect;
function userLogin({ id, name }) {
    return __awaiter(this, void 0, void 0, function* () {
        this.join('global');
        const res = yield index_1.io.in('global').fetchSockets();
        const usersInGlobal = res.map((user) => user.id);
        index_1.io.to('global').emit('users-in-room', usersInGlobal);
        console.log(usersInGlobal);
        user_1.users.push({
            clientId: id,
            name,
            currentRoom: 'global',
            serverId: this.id
        });
    });
}
exports.userLogin = userLogin;
//# sourceMappingURL=socketActions.js.map