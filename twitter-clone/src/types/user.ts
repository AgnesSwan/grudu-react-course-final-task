export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}


export interface AuthenticatedUser {
    user: User;
    isAuthenticated: boolean;
}
