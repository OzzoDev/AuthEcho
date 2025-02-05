const jwt = require("jsonwebtoken");
const { fullYear } = require("../utils/date");

const JWT_TOKEN_KEY = "jwtToken";
const JWT_APP_TOKEN_KEY = "jwtAppToken";
const REMEMBER_USER_KEY = "rememberUser";

const setCookies = (req, res) => {
  const { user, rememberUser, statusCode, message } = req.body;

  const sessionDuration = req.headers["user-session-duration"];

  const tokenExpiration = rememberUser ? (sessionDuration ? `${sessionDuration}h` : "1y") : "1h";

  const name = user.name;
  const email = user.email;

  const jwtToken = jwt.sign({ email: email, name: name, _id: user.id }, process.env.JWT_SECRET, {
    expiresIn: tokenExpiration,
  });

  const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
    path: "/",
  };

  res.cookie(JWT_TOKEN_KEY, "", cookieOptions);
  res.cookie(REMEMBER_USER_KEY, "", cookieOptions);

  if (rememberUser) {
    const expiryDate = sessionDuration
      ? new Date(Date.now() + parseInt(sessionDuration, 10) * 3600000)
      : fullYear();
    cookieOptions.expires = expiryDate;
  }

  res.cookie(JWT_TOKEN_KEY, jwtToken, cookieOptions);
  res.cookie(REMEMBER_USER_KEY, rememberUser, cookieOptions);

  res.status(statusCode).json({ message, success: true, name, email });
};

const setAppCookies = (req, res) => {
  const { user, rememberUser, statusCode, message, isAppAdmin } = req.body;

  const sessionDuration = req.headers["user-session-duration"];

  const tokenExpiration = rememberUser ? (sessionDuration ? `${sessionDuration}h` : "1y") : "1h";

  const name = user.name;
  const email = user.email;

  const jwtToken = jwt.sign(
    { email: email, name: name, _id: user.id, isAdmin: isAppAdmin },
    process.env.JWT_APP_SECRET,
    {
      expiresIn: tokenExpiration,
    }
  );

  const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
    path: "/",
  };

  res.cookie(JWT_APP_TOKEN_KEY, "", cookieOptions);
  res.cookie(REMEMBER_USER_KEY, "", cookieOptions);

  if (rememberUser) {
    const expiryDate = sessionDuration
      ? new Date(Date.now() + parseInt(sessionDuration, 10) * 3600000)
      : fullYear();
    cookieOptions.expires = expiryDate;
  }

  res.cookie(JWT_APP_TOKEN_KEY, jwtToken, cookieOptions);
  res.cookie(REMEMBER_USER_KEY, rememberUser, cookieOptions);

  res.status(statusCode).json({ message, success: true, name, email, isAppAdmin });
};

const removeCookies = (_, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
    expires: new Date(0),
    path: "/",
  };

  res.cookie(JWT_TOKEN_KEY, "", cookieOptions);
  res.cookie(REMEMBER_USER_KEY, "", cookieOptions);

  res.status(204).json({ message: "Access lost successfully", success: true });
};

const removeAppCookies = (_, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
    expires: new Date(0),
    path: "/",
  };

  res.cookie(JWT_APP_TOKEN_KEY, "", cookieOptions);
  res.cookie(REMEMBER_USER_KEY, "", cookieOptions);

  res.status(204).json({ message: "Signed out successfully", success: true });
};

const authenticateApp = async (req, res) => {
  const jwtToken = req.cookies[JWT_APP_TOKEN_KEY];

  if (jwtToken) {
    const rememberUser = req.cookies.rememberUser;

    if (
      rememberUser === "" ||
      rememberUser === "undefined" ||
      rememberUser === "false" ||
      rememberUser === false
    ) {
      res.cookie(JWT_APP_TOKEN_KEY, "", {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        expires: new Date(0),
        path: "/",
      });
    }

    try {
      const decoded = jwt.verify(jwtToken, process.env.JWT_APP_SECRET);

      if (!decoded) {
        return res.status(401).json({
          message: "Unauthenticated",
          success: false,
        });
      }

      const name = decoded.name;
      const email = decoded.email;

      return res.status(200).json({ message: "Authenticated", success: true, name, email });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(403).json({
          message: "Your session has expired. Please sign in again.",
          success: false,
        });
      }
      return res.status(500).json({
        message: "An error occurred during authentication.",
        success: false,
      });
    }
  }

  res.status(401).json({ message: "Unauthenticated", success: false });
};

const verifyAppSession = (req, res) => {
  const jwtToken = req.cookies[JWT_APP_TOKEN_KEY];
  const app = req.app;

  if (jwtToken) {
    try {
      const decoded = jwt.verify(jwtToken, process.env.JWT_APP_SECRET);

      if (!decoded) {
        return res.status(401).json({
          message: "Unauthenticated",
          success: false,
        });
      }

      let isAppAdmin = false;

      if (app && decoded.name) {
        const isAdmin = app.admins
          .map((admin) => admin.toLowerCase())
          .includes(decoded.name.toLowerCase());
        isAppAdmin = isAdmin;
      }

      return res.status(200).json({ message: "Authenticated", success: true, isAppAdmin });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(403).json({
          message: "Your session has expired. Please sign in again.",
          success: false,
        });
      }
      return res.status(500).json({
        message: "An error occurred during authentication.",
        success: false,
      });
    }
  }

  res.status(401).json({ message: "Unauthenticated", success: false });
};

const verifyAuthentication = async (req, res) => {
  const jwtToken = req.cookies.jwtToken;

  if (jwtToken) {
    const rememberUser = req.cookies.rememberUser;

    if (
      rememberUser === "" ||
      rememberUser === "undefined" ||
      rememberUser === "false" ||
      rememberUser === false
    ) {
      res.cookie("jwtToken", "", {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        expires: new Date(0),
        path: "/",
      });
    }

    try {
      const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

      if (!decoded) {
        return res.status(401).json({
          message: "Unauthenticated",
          success: false,
        });
      }

      const name = decoded.name;
      const email = decoded.email;

      return res.status(200).json({ message: "Authenticated", success: true, name, email });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(403).json({
          message: "Your session has expired. Please sign in again.",
          success: false,
        });
      }
      return res.status(500).json({
        message: "An error occurred during authentication.",
        success: false,
      });
    }
  }

  res.status(401).json({ message: "Unauthenticated", success: false });
};

module.exports = {
  setCookies,
  setAppCookies,
  removeCookies,
  removeAppCookies,
  authenticateApp,
  verifyAppSession,
  verifyAuthentication,
};
