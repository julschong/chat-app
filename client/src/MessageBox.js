import { useContext, useEffect, useState } from 'react';
import { context } from './App';

const MessageBox = () => {
    const [username, setUsername] = useState('');

    const socket = useContext(context);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        socket.on('broadcast message', (msg) =>
            setChatHistory((prev) => [...prev, msg])
        );
        socket.on('connected', ({ id }) => setUsername(id));
    }, [socket]);

    const sendMessage = (msg) => {
        socket.emit('chat message', msg);
        setMessage('');
    };

    return (
        <div>
            {`Username: ${username}`}
            {chatHistory.map((chat, i) => (
                <p key={i + chat}>{chat}</p>
            ))}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(message);
                }}
            >
                <input
                    type="text"
                    value={message}
                    placeholder="Type your message here..."
                    onChange={(e) => setMessage(e.target.value)}
                />
                <input type="submit" />
            </form>
        </div>
    );
};

export default MessageBox;
