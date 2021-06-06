import { useContext, useEffect } from 'react';
import { context } from './App';

const Trying = () => {
    const socket = useContext(context);

    useEffect(() => {
        socket.emit('chat message', 'hello');
    });

    return <div>hello</div>;
};

export default Trying;
