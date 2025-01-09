export interface ApiRes {
    data: JwtTokenResponse; 
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: Record<string, any>;
    request: Record<string, any>;
}

export interface JwtTokenResponse {
    message: string;
    success: boolean;
    jwtToken: string; 
}

export interface VerifyResponse {
    message: string;
    success: boolean;
}
