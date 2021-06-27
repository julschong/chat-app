import { SocketContext } from './../context/socketContext';
import { useContext, useRef } from 'react';

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
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Enter your name here"
                />
                <input type="submit" />
            </form>
        </div>
    );
};

export default Login;
