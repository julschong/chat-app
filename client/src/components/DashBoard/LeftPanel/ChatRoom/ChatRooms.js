import './ChatRooms.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { SocketContext } from '../../../../context/socketContext';

const ChatRooms = () => {
    const { socket, currentRoom, setCurrentRoom } = useContext(SocketContext);
    const [chatRooms, setChatRooms] = useState(['global']);
    const newRoomInputRef = useRef('');

    useEffect(() => {
        socket.on('total-chat-rooms', (chatrooms) => setChatRooms(chatrooms));
        socket.on('get-active-rooms', (data) => {
            setChatRooms((prev) => ['global', ...data]);
        });
        socket.emit('get-active-rooms');
    }, [socket]);

    const test = () => {
        const newRoomName = newRoomInputRef.current.value.trim();
        if (newRoomName === '') {
            return;
        }

        socket.emit('create-new-room', currentRoom, newRoomName);
        setCurrentRoom(newRoomName);
        newRoomInputRef.current.value = '';
    };

    const joinRoom = (roomName) => {
        if (currentRoom === roomName) {
            return;
        }
        socket.emit('create-new-room', currentRoom, roomName);
        setCurrentRoom(roomName);
    };

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
            />
            <button onClick={test}>create a room</button>
        </div>
    );
};

export default ChatRooms;
