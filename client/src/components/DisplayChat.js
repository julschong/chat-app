import { useRef, useEffect } from 'react';
import './styles/DisplayChat.css';

const DisplayChat = ({ chatHistory }) => {
    const bottomRef = useRef();

    useEffect(() => {
        bottomRef.current.scrollIntoView();
    }, [chatHistory]);

    return (
        <div className="display-chat-container">
            {chatHistory.map((chat, i) => (
                <p key={i + chat}>{chat}</p>
            ))}
            <div ref={bottomRef} />
        </div>
    );
};

export default DisplayChat;
