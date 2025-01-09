import axios, { AxiosResponse } from "axios";
import { ApiResponse, EmailValidation, PasswordValidation, ResetPassword, SignIn, UpdateEmail, User, VerifyAccountCredz } from "../types/userTypes";
import { AUTH_ENDPOINTS } from "../constants/ApiEndpoints";
import { JwtTokenResponse, DefaultResponse, UserDataResponse, UserData, VerificationCodeRequest } from "../types/apiTypes";
import { getToken, storeData, storeToken } from "./utils";
import { USEREMAIL_KEY, USERNAME_KEY } from "../constants/contants";

export async function signUp(userData:User):Promise<AxiosResponse<JwtTokenResponse>>{    
    try{
        const response = await axios.post<JwtTokenResponse>(AUTH_ENDPOINTS.SIGNUP, userData);
        const token:string = response.data.jwtToken; 
        storeToken(token); 
        storeData(USERNAME_KEY,userData.name); 
        storeData(USEREMAIL_KEY, userData.email); 
        return response; 
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

export async function signIn(userData: SignIn): Promise<AxiosResponse<JwtTokenResponse>> {        
    try {
        const response = await axios.post<JwtTokenResponse>(AUTH_ENDPOINTS.SIGNIN, userData);
        await getUserData(userData.userData); 
        const token:string = response.data.jwtToken; 
        storeToken(token);         
        return response; 
    } catch (error: unknown) {
        console.error(error);
        throw error; 
    }
}

export async function sendVerificationCode(params:VerificationCodeRequest):Promise<AxiosResponse<VerificationCodeRequest>>{            
    try{
        return await axios.post<VerificationCodeRequest>(AUTH_ENDPOINTS.SENDVERIFICATIONCODE, params);
    }catch(error : unknown){
        console.error(error);
        throw error; 
    }
}

export async function updateEmail(updateData:UpdateEmail):Promise<AxiosResponse<JwtTokenResponse>>{                
    try{
        const response = await axios.put<JwtTokenResponse>(AUTH_ENDPOINTS.UPDATEEMAIL,
            updateData,
            {
                headers:{
                    Authorization:`Bearer ${getToken()}`,
                    'Content-Type': 'application/json'
                }

            }
        );
        const token:string = response.data.jwtToken; 
        storeToken(token); 
        storeData(USEREMAIL_KEY, updateData.email); 
        return response; 
    }catch(error : unknown){
        console.error(error);
        throw error; 
    }
}

export async function validateEmail(data:EmailValidation):Promise<AxiosResponse<ApiResponse>>{
    try{
        return await axios.post<PasswordValidation, AxiosResponse<ApiResponse>>(AUTH_ENDPOINTS.VALIDATEEMAIL, data);
    }catch(error:unknown){
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

export async function resetPassword(userData:ResetPassword):Promise<AxiosResponse<JwtTokenResponse>>{                
    try{
        const response = await axios.post<JwtTokenResponse>(AUTH_ENDPOINTS.RESETPASSWORD, userData);
        await getUserData(userData.userData); 
        const token:string = response.data.jwtToken; 
        storeToken(token); 
        return response; 
    }catch(error : unknown){
        console.error(error);
        throw error; 
    }
}

export async function verify():Promise<AxiosResponse<DefaultResponse>> {
    try{
        return await axios.get<DefaultResponse>(AUTH_ENDPOINTS.VERIFY,{
            headers:{
                Authorization:`Bearer ${getToken()}`
            }
        });

    }catch(error:unknown){
        console.error(error);
        throw error; 
    }
}

export async function getUserData(userData:string):Promise<UserData> {
    try{        
        const response = await axios.post<UserDataResponse>(AUTH_ENDPOINTS.USERNAME, {userData});
        const userDataResponse = response.data.userData; 
        storeData(USERNAME_KEY, userDataResponse.name); 
        storeData(USEREMAIL_KEY, userDataResponse.email); 
        return userDataResponse; 
    }catch(error:unknown){
        console.error(error);
        throw error; 
    }
}