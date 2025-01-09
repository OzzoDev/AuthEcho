export function capitalize(str: string): string {
    if (!str) return str; 
    return str.charAt(0).toUpperCase() + str.slice(1);
}
  
export function removeAllQuotes(str: string): string {
    if (!str) return str; 
    return str.replace(/"/g, "");
}