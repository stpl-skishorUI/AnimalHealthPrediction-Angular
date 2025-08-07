export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    token?: string;
    message?: string;
    statusCode: string,
    statusMessage: string,
    user?: {
        id: string;
        username: string;
        email?: string;
        role?: string;
    };
}
