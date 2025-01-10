import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { AuthState } from "../types/auth"

const initialState:AuthState = {
    isAuthenticated:false,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        signup(state){
            state.isAuthenticated = true; 
        }, 
        signin(state){
            state.isAuthenticated = true; 
        },
        signout(state){
            state.isAuthenticated = false;
        },
        setAuth(state, action:PayloadAction<boolean>){
            state.isAuthenticated = action.payload; 
        }
    }
});  

export const {signup, signin, signout, setAuth} = authSlice.actions; 

export default authSlice.reducer; 