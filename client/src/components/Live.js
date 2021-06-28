import './styles/Live.css';
import { SocketContext } from './../context/socketContext';
import { useContext, useEffect, useState } from 'react';

const Live = () => {
    const [usersInRoom, setUsersInRoom] = useState([]);
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        socket.on('users-in-room', (data) => setUsersInRoom(data));
    }, [socket]);

    return (
        <div className="live-container">
            Whos in the Room?:
            <ul>
                {usersInRoom.map((user, i) => (
                    <li key={user + i}>{user}</li>
                ))}
            </ul>
        </div>
    );
};

export default Live;
