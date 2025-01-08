import axios, { AxiosResponse } from "axios";
import { SignUp, User, VerifyAccount } from "../types/userTypes";
import { AUTH_ENDPOINTS } from "../constants/ApiEndpoints";

export async function signUp(userData:User):Promise<AxiosResponse<SignUp>>{    
    try{
        return await axios.post<SignUp>(AUTH_ENDPOINTS.SIGNUP, userData);
    }catch(error : unknown){
        console.error(error);
        throw error; 
    }
}

export async function verifyAccount(credentials:VerifyAccount):Promise<AxiosResponse<VerifyAccount>>{    
    try{
        return await axios.post<VerifyAccount>(AUTH_ENDPOINTS.VERIFYACCOUNT, credentials);
    }catch(error : unknown){
        console.error(error);
        throw error; 
    }
}