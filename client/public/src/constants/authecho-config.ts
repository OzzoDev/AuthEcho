export const REVERSE_PROXY_URL = "http://localhost:3010";

export const AUTHECHO_ENDPOINTS = {
  REQUESTCODE: `${REVERSE_PROXY_URL}/authecho/app/requestcode`,
  VERIFYCODE: `${REVERSE_PROXY_URL}/authecho/app/verifycode`,
  VALIDATEQUESTION: `${REVERSE_PROXY_URL}/authecho/app/validatequestion`,
  SIGNIN: `${REVERSE_PROXY_URL}/authecho/app/signin`,
  AUTHENTICATE: `${REVERSE_PROXY_URL}/authecho/app/authenticate`,
  SIGNOUT: `${REVERSE_PROXY_URL}/authecho/app/signout`,
  VERIFYSESSION: `${REVERSE_PROXY_URL}/authecho/app/verifysession`,
  TRACKACTIVITY: `${REVERSE_PROXY_URL}/authecho/app/activity`,
};
