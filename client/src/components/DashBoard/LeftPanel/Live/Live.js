import './Live.css';
import {
    SocketContext,
    SOCKET_EVENTS
} from '../../../../context/socketContext';
import { useContext, useEffect, useState } from 'react';

const Live = () => {
    const [usersInRoom, setUsersInRoom] = useState([]);
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        socket.on(SOCKET_EVENTS.USERS_IN_ROOM, (data) => setUsersInRoom(data));

        return () => {
            socket.off(SOCKET_EVENTS.USERS_IN_ROOM);
        };
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
