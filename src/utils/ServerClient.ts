import axios, { AxiosResponse } from "axios";
import { SignUp, User } from "../types/userTypes";
import { AUTH_ENDPOINTS } from "../constants/ApiEndpoints";

export async function signUp(userData:User):Promise<AxiosResponse<SignUp>>{
    console.log("User data: ", userData);
    
    try{
        const response = await axios.post<SignUp>(AUTH_ENDPOINTS.SIGNUP, userData);
        return response;
    }catch(error : unknown){
        console.error(error);
        throw error; 
    }
}