import { useContext, useEffect, useState, useRef } from 'react';
import './MessageBox.css';
import DisplayChat from './DisplayChat/DisplayChat';
import { SocketContext } from '../../../context/socketContext';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MessageBox = () => {
    const { socket, user } = useContext(SocketContext);
    const message = useRef();
    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        socket.on('broadcast-message', (id, name, msg) => {
            console.log(id, name, msg);
            setChatHistory((prev) => [
                ...prev,
                { user: { id, name }, message: msg }
            ]);
        });
    }, [socket]);

    const sendMessage = (msg) => {
        if (msg.trim() === '') {
            return;
        }
        socket.emit('chat-message', { message: msg, user });
        setChatHistory((prev) => [...prev, { user, message: msg }]);
        setEditerValue('');
        // message.current.value = '';
        // message.current.focus();
    };

    const [editerValue, setEditerValue] = useState('');
    const quillRef = useRef();

    return (
        <div className="message-container">
            <DisplayChat
                setChatHistory={setChatHistory}
                chatHistory={chatHistory}
            />
            <form
                className="form-control"
                onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(editerValue);
                }}
            >
                <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={editerValue}
                    onChange={(e) => {
                        console.dir(quillRef.current.editor.getLength() - 1);
                        setEditerValue(e);
                    }}
                    placeholder="Type your message here..."
                    className="message-input"
                />
                {/* <div
                    dangerouslySetInnerHTML={{ __html: editerValue }}
                ></div> */}
                {/* <input
                    className="message-input"
                    type="text"
                    ref={message}
                    placeholder="Type your message here..."
                /> */}

                <input className="send-btn" type="submit" value="Send" />
            </form>
        </div>
    );
};

export default MessageBox;
