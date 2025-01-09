export interface ApiRes {
    data: SignInResponse; // This is correct for your response structure
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: Record<string, any>;
    request: Record<string, any>;
}

// SignInResponse remains the same
export interface SignInResponse {
    message: string;
    success: boolean;
    jwtToken: string; // This will be directly accessible
    email: string;
    name: string;
}

export interface VerifyResponse {
    message: string;
    success: boolean;
}
