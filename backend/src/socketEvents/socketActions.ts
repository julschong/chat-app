import { io } from '../index';
import { Socket } from 'socket.io';
import { User, users } from './../_data/user';

interface BroadcastMessage {
    user: {
        id: string;
        name: string;
    };
    message: string;
}

export function broadcast(msg: BroadcastMessage) {
    const thisUser = users.find((user) => user.serverId === this.id);
    if (!thisUser) {
        console.log(thisUser);
        return;
    }

    this.to(thisUser.currentRoom).emit(
        'broadcast-message',
        msg.user.id,
        msg.user.name,
        msg.message
    );
}

/**
 * This function is called when user emits 'create-new-room' from client socket
 * user socket leaves the oldroom and create and join new room
 * if new room already existed, it will not create newRoom (Socket Rooms are in a Set)
 * @param  {string} oldRoomName
 * @param  {string} roomName
 */
export async function joinNewRoom(oldRoomName: string, roomName: string) {
    if (!roomName || roomName.trim() === '') {
        return;
    }
    // *this* here references to the socket that is using this callback
    await this.leave(oldRoomName);
    await this.join(roomName);

    const userIndex = users.findIndex((user) => user.serverId === this.id);
    const user: User = { ...users[userIndex], currentRoom: roomName };
    users.splice(userIndex, 1);
    users.push(user);

    io.to(roomName).emit(
        'broadcast-message',
        '1',
        'server',
        `${user.name} has joined room: ${roomName}`
    );

    const newRoomUsers = users.filter((user) => user.currentRoom === roomName);
    io.to(roomName).emit('users-in-room', newRoomUsers);

    io.to(oldRoomName).emit(
        'broadcast-message',
        '1',
        'server',
        `${user.name} has left room: ${oldRoomName}`
    );
    const oldRoomUsers = users.filter(
        (user) => user.currentRoom === oldRoomName
    );
    io.to(oldRoomName).emit('users-in-room', oldRoomUsers);

    io.emit('get-active-rooms', getActiveRooms(io.sockets.adapter.rooms));
}

export async function getActiveRoomList() {
    this.emit('get-active-rooms', getActiveRooms(io.sockets.adapter.rooms));
}

export function getActiveRooms(
    dataFromIoSocketsAdapeterRooms: Map<string, Set<string>>
) {
    // Convert map into 2D list:
    // ==> [['4ziBKG9XFS06NdtVAAAH', Set(1)], ['room1', Set(2)], ...]
    const arr = Array.from(dataFromIoSocketsAdapeterRooms);
    // Filter rooms whose name exist in set:
    // ==> [['room1', Set(2)], ['room2', Set(2)]]
    const filtered = arr.filter(
        (room) => !room[1].has(room[0]) && room[0] !== 'global'
    );
    // Return only the room name:
    // ==> ['room1', 'room2']
    const res = filtered.map((i) => i[0]);
    return res;
}

export function userDisconnect() {
    const id = users.findIndex((user: User) => user.serverId === this.id);
    users.splice(id, 1);
}

export interface LoginMessage {
    id: string;
    name: string;
}
export async function userLogin({ id, name }: LoginMessage) {
    this.join('global');
    users.push({
        clientId: id,
        name,
        currentRoom: 'global',
        serverId: this.id
    });
    const usersInGlobal = users.filter((user) => (user.currentRoom = 'global'));
    io.to('global').emit('users-in-room', usersInGlobal);
    // console.log(usersInGlobal);
}

export async function userLogout() {
    const id = users.findIndex((user: User) => user.serverId === this.id);
    users.splice(id, 1);
}
