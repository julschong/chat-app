import './LeftPanel.css';
import { useContext } from 'react';
import { SocketContext } from '../../../context/socketContext';
import Live from './Live/Live';
import ChatRooms from './ChatRoom/ChatRooms';

const LeftPanel = () => {
    const { user } = useContext(SocketContext);
    return (
        <div className="left-container">
            Welcome! {user && user.name}
            <ChatRooms />
            <Live />
        </div>
    );
};

export default LeftPanel;
