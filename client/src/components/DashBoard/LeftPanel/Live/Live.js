import './Live.css';
import { SocketContext } from '../../../../context/socketContext';
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
            <div>
                {usersInRoom.map((user, i) => (
                    <p key={user.name + i}>{user.name}</p>
                ))}
            </div>
        </div>
    );
};

export default Live;
