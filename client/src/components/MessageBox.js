import { useContext, useEffect, useState, useRef } from 'react';
import './styles/MessageBox.css';
import DisplayChat from './DisplayChat';
import { SocketContext } from './../context/socketContext';

const MessageBox = () => {
    const { socket, user } = useContext(SocketContext);
    const message = useRef();
    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        socket.on('broadcast message', (msg) =>
            setChatHistory((prev) => [...prev, msg])
        );
    }, [socket]);

    const sendMessage = (msg) => {
        if (msg.trim() === '') {
            return;
        }
        socket.emit('chat message', { message: msg, user });
        message.current.value = '';
        message.current.focus();
    };

    return (
        <div className="message-container">
            <DisplayChat chatHistory={chatHistory} />
            <form
                className="form-control"
                onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(message.current.value);
                }}
            >
                <input
                    className="message-input"
                    type="text"
                    ref={message}
                    placeholder="Type your message here..."
                />
                <input className="send-btn" type="submit" value="Send" />
            </form>
        </div>
    );
};

export default MessageBox;
