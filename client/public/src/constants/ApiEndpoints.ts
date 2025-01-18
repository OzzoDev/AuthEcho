export const API_BASE_URL = "http://localhost:3001";

export const AUTH_ENDPOINTS = {
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  // SIGNUP: "http://localhost:3000/auth/signup",
  // SIGNUP: "http://localhost:3001/auth/signup",
  VERIFYACCOUNT: `${API_BASE_URL}/verifyaccount`,
  SIGNIN: `${API_BASE_URL}/signin`,
  UPDATEEMAIL: `${API_BASE_URL}/updateemail`,
  UPDATEUSERNAME: `${API_BASE_URL}/updateusername`,
  SENDVERIFICATIONCODE: `${API_BASE_URL}/sendverificationcode`,
  VALIDATEEMAIL: `${API_BASE_URL}/validateemail`,
  VALIDATEPASSWORD: `${API_BASE_URL}/validatepassword`,
  RESETPASSWORD: `${API_BASE_URL}/resetpassword`,
  UPDATEPASSWORD: `${API_BASE_URL}/updatepassword`,
  UNLOCKACCOUNT: `${API_BASE_URL}/unlockaccount`,
  ISSUSPENDED: `${API_BASE_URL}/issuspended`,
  VERIFYAUTHENTICATION: `${API_BASE_URL}/verifyauthentication`,
  USERNAME: `${API_BASE_URL}/userdata`,
  SECURITYQUESTIONS: `${API_BASE_URL}/securityquestions`,
  SETSECURITYQUESTION: `${API_BASE_URL}/setsecurityquestion`,
  GETUSERSECURITYQUESTION: `${API_BASE_URL}/getusersecurityquestion`,
  VALIDATESECURITYQUESTION: `${API_BASE_URL}/validatesecurityquestion`,
};
