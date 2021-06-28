export interface User {
    clientId: string;
    serverId: string;
    name: string;
    currentRoom: string;
}

export const users: User[] = [];
