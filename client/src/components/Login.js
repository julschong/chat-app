import { SocketContext } from './../context/socketContext';
import { useContext, useRef } from 'react';
import './Login.css';

const Login = () => {
    const { newLogin } = useContext(SocketContext);
    const inputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputRef.current.value.trim() === '') {
            return;
        }
        newLogin(inputRef.current.value);
    };

    return (
        <div className="animate__animated animate__fadeIn">
            <form onSubmit={handleSubmit}>
                <input
                    className="name-input"
                    ref={inputRef}
                    type="text"
                    placeholder="Enter your name here"
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit(e);
                        }
                    }}
                />
            </form>
        </div>
    );
};

export default Login;
