import axios from "axios";
import { AuthechoApp, FetchStatus } from "../types/types";

export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const decapitalize = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toLowerCase() + str.slice(1);
};

export function removeAllQuotes(str: string): string {
  if (!str) return str;
  return str.replace(/"/g, "");
}

export function handleError(
  error: unknown,
  setStatus: (status: FetchStatus) => void,
  setError: (error: string) => void
): void {
  if (axios.isAxiosError(error)) {
    const errorMessage: string = capitalize(
      removeAllQuotes(error.response?.data.message || error.message)
    );
    console.error(error);
    setStatus("error");
    setError(errorMessage);
  }
}

export function generateID(array: number[]): number {
  if (array.length === 0) {
    return 1;
  } else {
    return Math.max(...array.map((item) => item)) + 1;
  }
}

export function joinWithAnd(arr: string[]): string {
  if (arr.length === 0) return "";
  if (arr.length === 1) return arr[0];
  if (arr.length === 2) return arr.join(" and ");
  return arr.slice(0, -1).join(", ") + " and " + arr[arr.length - 1];
}

export function removeAllWhitespaces(str: string): string {
  return str.replace(/\s+/g, "");
}

export function calcPageCount(array: AuthechoApp[], maxItems: number): number {
  const visibleItems = [...array].filter((item) => item.isVisible);
  return Math.ceil(visibleItems.length / maxItems);
}

export function showOnPagination(
  index: number,
  page: number,
  itemsCount: number | undefined = 5
): boolean {
  return index >= (page - 1) * itemsCount && index < page * itemsCount;
}
