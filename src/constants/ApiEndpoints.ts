export const API_BASE_URL = "http://localhost:3000"; 

export const AUTH_ENDPOINTS = {
    SIGNUP: `${API_BASE_URL}/auth/signup`,
    SIGNIN: `${API_BASE_URL}/auth/signin`,
    UPDATEEMAIL: `${API_BASE_URL}/auth/updateemail`,
    UPDATEUSERNAME: `${API_BASE_URL}/auth/updateusername`,
    SENDVERIFICATIONCODE: `${API_BASE_URL}/auth/sendverificationcode`,
    RESETPASSWORD: `${API_BASE_URL}/auth/resetpassword`,
}