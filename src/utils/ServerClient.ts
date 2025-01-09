import axios, { AxiosResponse } from "axios";
import { ApiResponse, PasswordValidation, ResetPassword, SignIn, SignUp, User, VerifyAccountCredz } from "../types/userTypes";
import { AUTH_ENDPOINTS } from "../constants/ApiEndpoints";

export async function signUp(userData:User):Promise<AxiosResponse<SignUp>>{    
    try{
        return await axios.post<SignUp>(AUTH_ENDPOINTS.SIGNUP, userData);
    }catch(error : unknown){
        console.error(error);
        throw error; 
    }
}

export async function verifyAccount(credentials:VerifyAccountCredz):Promise<AxiosResponse<VerifyAccountCredz>>{    
    try{
        return await axios.post<VerifyAccountCredz>(AUTH_ENDPOINTS.VERIFYACCOUNT, credentials);
    }catch(error : unknown){
        console.error(error);
        throw error; 
    }
}

export async function signIn(userData:SignIn):Promise<AxiosResponse<SignIn>>{        
    try{
        return await axios.post<SignIn>(AUTH_ENDPOINTS.SIGNIN, userData);
    }catch(error : unknown){
        console.error(error);
        throw error; 
    }
}

export async function sendVerificationCode(userData:string):Promise<AxiosResponse<string>>{            
    try{
        return await axios.post<string>(AUTH_ENDPOINTS.SENDVERIFICATIONCODE, {userData});
    }catch(error : unknown){
        console.error(error);
        throw error; 
    }
}

export async function validatePassword(credentials:PasswordValidation):Promise<AxiosResponse<ApiResponse>>{
    try{
        return await axios.post<PasswordValidation, AxiosResponse<ApiResponse>>(AUTH_ENDPOINTS.VALIDATEPASSWORD, credentials);
    }catch(error:unknown){
        console.error(error);
        throw error;
    }
}

export async function resetpassword(userData:ResetPassword):Promise<AxiosResponse<ResetPassword>>{                
    try{
        return await axios.post<ResetPassword>(AUTH_ENDPOINTS.RESETPASSWORD, userData);
    }catch(error : unknown){
        console.error(error);
        throw error; 
    }
}