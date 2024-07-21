export interface User {
    id: number;
    username?: string;
    email: string;
    phone?: string;
    password: string;
    createdAt: Date;
    updatedAt?: Date;

    roles: string[];
}
