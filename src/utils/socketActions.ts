import { io } from '../index';

interface BroadcastMessage {
    user: {
        id: string;
        name: string;
    };
    message: string;
}

export const broadcast = (msg: BroadcastMessage) => {
    io.to('global').emit(
        'broadcast message',
        `${msg.user.name}: ${msg.message}`
    );
};
