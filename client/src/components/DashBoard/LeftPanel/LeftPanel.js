import './LeftPanel.css';
import { useContext, useEffect } from 'react';
import {
    APP_STORAGE_KEY,
    SocketContext,
    SOCKET_EVENTS
} from '../../../context/socketContext';
import Live from './Live/Live';
import ChatRooms from './ChatRoom/ChatRooms';
import { GiHamburgerMenu } from 'react-icons/gi';

const LeftPanel = ({ menu, setMenu }) => {
    const { user, setUser, socket } = useContext(SocketContext);

    const resize = (setMenu) => {
        if (window.innerWidth > 600) {
            setMenu(true);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        };
    }, [setMenu]);

    return (
        <div
            className="left-container"
            style={{
                transform: `translateX(${
                    menu ? '0%' : `${window.innerWidth <= 600 && '-150%'}`
                })`
            }}
        >
            <button
                className="menu-btn side-menu-btn"
                onClick={() => setMenu((m) => !m)}
            >
                <GiHamburgerMenu />
            </button>
            Welcome! {user && user.name}
            <button
                onClick={() => {
                    window.localStorage.removeItem(APP_STORAGE_KEY);
                    setUser();
                    socket.emit(SOCKET_EVENTS.LOGOUT);
                }}
            >
                sign out
            </button>
            <ChatRooms />
            <Live />
        </div>
    );
};

export default LeftPanel;
