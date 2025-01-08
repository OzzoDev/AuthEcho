export type User={
    name:string, 
    email:string, 
    password: string,
}

export type UserLogin={
    email:string, 
    password:string
}

export type AxiosRequest<T = string> = {
    url:string, 
    data?:T
}

export type SignUp = {
    email:string, 
    name: string,
    password:string,
}

export type VerifyAccountCredz = {
    email: string,
    verificationCode:string,
}

export type FetchStatus = "idle" | "loading" | "error" | "success";
