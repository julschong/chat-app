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
                    <p key={i + chat}>{chat}</p>
                ))}
                <div ref={bottomRef} />
            </div>
        </>
    );
};

export default DisplayChat;
