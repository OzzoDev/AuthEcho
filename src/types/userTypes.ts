export type User={
    name:string, 
    email:string, 
    password: string,
}

export type UpdateEmail = {
    userData:string,
    email:string,
    verificationCode:string,
}

export type UpdateUsername = {
    userData:string,
    name:string,
}

export type UpdatePassword = {
    userData:string, 
    newPassword:string, 
    confirmNewPassword:string
}

export type Password = {
    newPassword:string, 
    confirmNewPassword:string
}

export type AxiosRequest<T = string> = {
    url:string, 
    data?:T
}

export type ApiResponse={
    message:string,
    success:boolean,
}

export type SignUp = {
    email:string, 
    name: string,
    password:string,
}

export type SignIn = {
    userData:string, 
    password:string,
}

export type EmailValidation = {
    userData:string,
    newEmail:string,
}

export type VerifyAccountCredz = {
    email: string,
    verificationCode:string,
}

export type ResetPassword = {
    userData:string,
    verificationCode:string,
    newPassword:string,
    confirmNewPassword:string,
}

export type PasswordValidation = {
    newPassword:string,
    confirmNewPassword:string,
}

export type FetchStatus = "idle" | "loading" | "error" | "success";
