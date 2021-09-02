import { useRef, useEffect, useContext } from 'react';
import './DisplayChat.css';
import { SocketContext } from '../../../../context/socketContext';
import SingleMessage from './SingleMessage/SingleMessage';

const DisplayChat = ({ chatHistory, setChatHistory }) => {
    const bottomRef = useRef();
    const { currentRoom } = useContext(SocketContext);

    useEffect(() => {
        bottomRef.current.scrollIntoView();
    }, [chatHistory]);

    useEffect(() => {
        setChatHistory([]);
    }, [currentRoom, setChatHistory]);

    return (
        <>
            <p>{currentRoom}</p>
            <div className="display-chat-container">
                {chatHistory.map((chat, i) => (
                    <SingleMessage chat={chat} key={chat + i} />
                ))}
                <div ref={bottomRef} />
            </div>
        </>
    );
};

export default DisplayChat;
