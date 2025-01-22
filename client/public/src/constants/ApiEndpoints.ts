export const API_BASE_URL = "http://localhost:3001";

export const ENDPOINTS = {
  SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  SIGNIN: `${API_BASE_URL}/api/auth/signin`,
  SIGNOUT: `${API_BASE_URL}/api/auth/signout`,
  VERIFYACCOUNT: `${API_BASE_URL}/api/auth/verifyaccount`,
  UPDATEEMAIL: `${API_BASE_URL}/api/auth/updateemail`,
  UPDATEUSERNAME: `${API_BASE_URL}/api/auth/updateusername`,
  SENDVERIFICATIONCODE: `${API_BASE_URL}/api/auth/sendverificationcode`,
  REQUESTUNLOCKCODE: `${API_BASE_URL}/api/auth/requestunlockcode`,
  VALIDATEEMAIL: `${API_BASE_URL}/api/auth/validateemail`,
  VALIDATEPASSWORD: `${API_BASE_URL}/api/auth/validatepassword`,
  RESETPASSWORD: `${API_BASE_URL}/api/auth/resetpassword`,
  UPDATEPASSWORD: `${API_BASE_URL}/api/auth/updatepassword`,
  UNLOCKACCOUNT: `${API_BASE_URL}/api/auth/unlockaccount`,
  ISSUSPENDED: `${API_BASE_URL}/api/auth/issuspended`,
  VERIFYAUTHENTICATION: `${API_BASE_URL}/api/auth/verifyauthentication`,
  SECURITYQUESTIONS: `${API_BASE_URL}/api/auth/securityquestions`,
  SETSECURITYQUESTION: `${API_BASE_URL}/api/auth/setsecurityquestion`,
  GETUSERSECURITYQUESTION: `${API_BASE_URL}/api/auth/getusersecurityquestion`,
  VALIDATESECURITYQUESTION: `${API_BASE_URL}/api/auth/validatesecurityquestion`,
  JOIN: `${API_BASE_URL}/api/connect/join`,
};
