export interface Room {
    users: string[];
    name: string;
}

export const room: Room[] = [
    {
        users: [],
        name: 'global'
    }
];
