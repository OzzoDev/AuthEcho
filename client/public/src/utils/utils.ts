// @ts-ignore
import Cookies from "js-cookie";
import axios from "axios";
import { FetchStatus } from "../types/apiTypes";

export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function removeAllQuotes(str: string): string {
  if (!str) return str;
  return str.replace(/"/g, "");
}

export function sessionStore(key: string, data: string | number | boolean): void {
  sessionStorage.setItem(key, data as string);
}

export function getSessionData(key: string): string {
  return sessionStorage.getItem(key) as string;
}

export function removeSessionData(key: string): void {
  sessionStorage.removeItem(key);
}

export function storeData(key: string, data: string): void {
  Cookies.set(key, data, { secure: true, sameSite: "Strict" });
}

export function getData(key: string): string {
  return Cookies.get(key) || "";
}

export function removeData(key: string): void {
  Cookies.remove(key);
}

export function handleError(error: unknown, setStatus: (status: FetchStatus) => void, setError: (error: string) => void): void {
  if (axios.isAxiosError(error)) {
    const errorMessage: string = capitalize(removeAllQuotes(error.response?.data.message || error.message));
    console.error(error);
    setStatus("error");
    setError(errorMessage);
  }
}
