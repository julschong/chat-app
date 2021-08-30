import './LeftPanel.css';
import { useContext, useEffect } from 'react';
import { SocketContext } from '../../../context/socketContext';
import Live from './Live/Live';
import ChatRooms from './ChatRoom/ChatRooms';
import { GiHamburgerMenu } from 'react-icons/gi';

const LeftPanel = ({ menu, setMenu }) => {
    const { user } = useContext(SocketContext);

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth > 600) {
                setMenu(true);
            }
        });
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
            <ChatRooms />
            <Live />
        </div>
    );
};

export default LeftPanel;
