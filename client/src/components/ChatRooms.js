import './styles/ChatRooms.css';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from './../context/socketContext';

const ChatRooms = () => {
    const { socket, currentRoom, setCurrentRoom } = useContext(SocketContext);
    const [chatRooms, setChatRooms] = useState(['global']);

    useEffect(() => {
        socket.on('total-chat-rooms', (chatrooms) => setChatRooms(chatrooms));
        socket.on('get-active-rooms', (data) => {
            setChatRooms((prev) => ['global', ...data]);
        });
        socket.emit('get-active-rooms');
    }, [socket]);

    const test = (e) => {
        e.preventDefault();
        socket.emit('create-new-room', currentRoom, 'room 3');
        setCurrentRoom('room 3');
    };
    return (
        <div className="chat-rooms-container">
            Rooms:
            <button onClick={test}>create a room</button>
            <ul>
                {chatRooms.map((chatRoom, i) => (
                    <li key={chatRoom + i}>{chatRoom}</li>
                ))}
            </ul>
        </div>
    );
};

export default ChatRooms;
