import { useContext, useEffect, useState } from 'react';
import { context } from './App';

const MessageBox = () => {
    const socket = useContext(context);
    const [message, setMessage] = useState('');

    useEffect(() => {
        socket.emit('chat message', 'hello');
        socket.on('broadcast message', (msg) => console.log(msg));
    }, [socket]);

    const sendMessage = (msg) => {
        socket.emit('chat message', msg);
        setMessage('');
    };

    return (
        <div>
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
