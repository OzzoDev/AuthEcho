export type ApiRes = {
    data: JwtTokenResponse; 
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: Record<string, any>;
    request: Record<string, any>;
}

export type JwtTokenResponse = {
    message: string;
    success: boolean;
    jwtToken: string; 
}

export type DefaultResponse = {
    message: string;
    success: boolean;
}

export type UserDataResponse = {
    message:string,
    success:boolean,
    userData: UserData,
}

export type VerificationCodeRequest = {
    userData:string,
    emailBodyText:string,
    to?:string,
}

export type UserData = {
    name:string,
    email:string,
}
