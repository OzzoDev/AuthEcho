// @ts-ignore
import Cookies from "js-cookie";
import { TOKEN_KEY } from "../constants/contants";
import { verify } from "./ServerClient";
import axios from "axios";

export function capitalize(str: string): string {
    if (!str) return str; 
    return str.charAt(0).toUpperCase() + str.slice(1);
}
  
export function removeAllQuotes(str: string): string {
    if (!str) return str; 
    return str.replace(/"/g, "");
}

export function storeToken(token:string):void{
    Cookies.set(TOKEN_KEY, token,{secure:true, sameSite:"Strict"});
}

export function getToken():string{
    return Cookies.get(TOKEN_KEY); 
}

export function removeToken():void {
    Cookies.remove(TOKEN_KEY);
}

export function storeData(key:string, data:string):void{
    Cookies.set(key, data,{secure:true, sameSite:"Strict"});
}

export function getData(key:string):string{
    return Cookies.get(key); 
}

export function removeData(key:string):void{
    Cookies.remove(key); 
}

export async function verifyAccount (setError: (error: string) => void) {
    try {
      await verify();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage: string = capitalize(removeAllQuotes(error.response?.data.message || error.message));
        setError(errorMessage);
      }
    }
  };