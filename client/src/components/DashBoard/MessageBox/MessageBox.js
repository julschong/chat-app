import { useContext, useEffect, useState, useRef } from 'react';
import './MessageBox.css';
import DisplayChat from './DisplayChat/DisplayChat';
import { SocketContext, SOCKET_EVENTS } from '../../../context/socketContext';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { formatDateTime } from '../../../util/helper';

const MessageBox = ({ setMenu }) => {
    const { socket, user } = useContext(SocketContext);
    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        socket.on(SOCKET_EVENTS.BROADCAST_MESSAGE, (id, name, msg, time) => {
            setChatHistory((prev) => [
                ...prev,
                {
                    user: { id, name },
                    message: msg,
                    time: formatDateTime(new Date(time))
                }
            ]);
        });
        quillRef.current.editor.focus();
        return () => {
            socket.off(SOCKET_EVENTS.BROADCAST_MESSAGE);
        };
    }, [socket]);

    const sendMessage = (msg) => {
        if (msg.trim() === '') {
            return;
        }
        socket.emit(SOCKET_EVENTS.SEND_CHAT, { message: msg, user });
        setChatHistory((prev) => [
            ...prev,
            { user, message: msg, time: formatDateTime(new Date()), self: true }
        ]);
        setEditerValue('');
    };

    const [editerValue, setEditerValue] = useState('');
    const [shift, setShift] = useState(false);
    const quillRef = useRef();
    const sendRef = useRef();

    return (
        <div className="message-container">
            <button className="menu-btn" onClick={() => setMenu((m) => !m)}>
                <GiHamburgerMenu />
            </button>
            <DisplayChat
                setChatHistory={setChatHistory}
                chatHistory={chatHistory}
            />
            <form
                className="form-control"
                onSubmit={(e) => {
                    e.preventDefault();

                    sendMessage(
                        editerValue.replace(
                            /^(<p><br><\/p>)*|(<p><br><\/p>)*$/g,
                            ''
                        )
                    );
                }}
            >
                <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={editerValue}
                    onChange={(e) => {
                        // console.dir(quillRef.current.editor.getLength() - 1);
                        setEditerValue(e);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Shift') {
                            setShift(true);
                        }
                        if (e.key === 'Enter' && !shift) {
                            sendRef.current.click();
                        }
                    }}
                    onKeyUp={(e) => {
                        if (e.key === 'Shift') {
                            setShift(false);
                        }
                    }}
                    placeholder="Type your message here... shift+enter for new line"
                    className="message-input"
                />

                <input
                    className="send-btn"
                    type="submit"
                    value="Send"
                    ref={sendRef}
                />
            </form>
        </div>
    );
};

export default MessageBox;
