import './ChatRooms.css';
import { useContext, useEffect, useRef, useState } from 'react';
import {
    SocketContext,
    SOCKET_EVENTS
} from '../../../../context/socketContext';

const ChatRooms = () => {
    const { socket, joinRoom, createRoom } = useContext(SocketContext);
    const [chatRooms, setChatRooms] = useState(['global']);
    const newRoomInputRef = useRef('');

    useEffect(() => {
        socket.on(SOCKET_EVENTS.CREATE_NEW_ROOM, (chatrooms) =>
            setChatRooms(chatrooms)
        );
        socket.on(SOCKET_EVENTS.GET_ACTIVE_ROOMS, (data) => {
            setChatRooms((prev) => ['global', ...data]);
        });
        socket.emit(SOCKET_EVENTS.GET_ACTIVE_ROOMS);

        return () => {
            socket.off(SOCKET_EVENTS.TOTAL_CHAT_ROOMS);
            socket.off(SOCKET_EVENTS.GET_ACTIVE_ROOMS);
        };
    }, [socket]);

    return (
        <div className="chat-rooms-container">
            Rooms:
            {chatRooms.map((chatRoom, i) => (
                <p
                    onClick={() => {
                        joinRoom(chatRoom);
                    }}
                    key={chatRoom + i}
                    style={{ cursor: 'pointer' }}
                >
                    {chatRoom}
                </p>
            ))}
            <input
                ref={newRoomInputRef}
                type="text"
                placeholder="type a room name"
                style={{ maxWidth: '100%' }}
            />
            <button onClick={() => createRoom(newRoomInputRef)}>
                create a room
            </button>
        </div>
    );
};

export default ChatRooms;
