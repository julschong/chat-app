import './styles/LeftPanel.css';
import ChatRooms from './ChatRooms';
import Live from './Live';
import { useContext } from 'react';
import { SocketContext } from './../context/socketContext';

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
