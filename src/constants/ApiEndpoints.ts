export const API_BASE_URL = "http://localhost:3000"; 

export const AUTH_ENDPOINTS = {
    SIGNUP: `${API_BASE_URL}/auth/signup`,
    VERIFYACCOUNT: `${API_BASE_URL}/auth/verifyaccount`,
    SIGNIN: `${API_BASE_URL}/auth/signin`,
    UPDATEEMAIL: `${API_BASE_URL}/auth/updateemail`,
    UPDATEUSERNAME: `${API_BASE_URL}/auth/updateusername`,
    SENDVERIFICATIONCODE: `${API_BASE_URL}/auth/sendverificationcode`,
    VALIDATEEMAIL:`${API_BASE_URL}/auth/validateemail`,
    VALIDATEPASSWORD:`${API_BASE_URL}/auth/validatepassword`,
    RESETPASSWORD: `${API_BASE_URL}/auth/resetpassword`,
    UPDATEPASSWORD: `${API_BASE_URL}/auth/updatepassword`,
    VERIFY:`${API_BASE_URL}/auth/verify`,
    USERNAME:`${API_BASE_URL}/auth/userdata`
}