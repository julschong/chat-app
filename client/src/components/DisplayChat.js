import { useRef, useEffect, useContext } from 'react';
import './styles/DisplayChat.css';
import { SocketContext } from './../context/socketContext';

const DisplayChat = ({ chatHistory }) => {
    const bottomRef = useRef();
    const { currentRoom } = useContext(SocketContext);

    useEffect(() => {
        bottomRef.current.scrollIntoView();
    }, [chatHistory]);

    return (
        <>
            <p>{currentRoom}</p>
            <div className="display-chat-container">
                {chatHistory.map((chat, i) => (
                    <div key={i + chat}>
                        <p>{`${chat.user.name}: ${chat.message}`}</p>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>
        </>
    );
};

export default DisplayChat;
