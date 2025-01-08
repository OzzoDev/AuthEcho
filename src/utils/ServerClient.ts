import axios, { AxiosResponse } from "axios";
import { SignIn, SignUp, User, VerifyAccountCredz } from "../types/userTypes";
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
    console.log("Userdata: ", userData);
    
    try{
        return await axios.post<SignIn>(AUTH_ENDPOINTS.SIGNIN, userData);
    }catch(error : unknown){
        console.error(error);
        throw error; 
    }
}