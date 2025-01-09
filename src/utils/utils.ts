// @ts-ignore
import Cookies from "js-cookie";
import { TOKEN_KEY } from "../constants/contants";

export function capitalize(str: string): string {
    if (!str) return str; 
    return str.charAt(0).toUpperCase() + str.slice(1);
}
  
export function removeAllQuotes(str: string): string {
    if (!str) return str; 
    return str.replace(/"/g, "");
}

export function storeToken(token:string){
    Cookies.set(TOKEN_KEY, token,{secure:true, sameSite:"Strict"});
}

export function getToken(){
    return Cookies.get(TOKEN_KEY); 
}

export function removeToken() {
    Cookies.remove(TOKEN_KEY);
}