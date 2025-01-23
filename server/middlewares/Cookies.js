const jwt = require("jsonwebtoken");
const { fullYear } = require("../utils/date");

const JWT_TOKEN_KEY = "jwtToken";
const REMEMBER_USER_KEY = "rememberUser";

const setCookies = (req, res) => {
  const { user, rememberUser, statusCode, message, isAppAdmin } = req.body;

  const sessionDuration = req.headers["user-session-duration"];

  const tokenExpiration = rememberUser ? (sessionDuration ? `${sessionDuration}h` : "1y") : "1h";

  const jwtToken = jwt.sign(
    { email: user.email, name: user.name, _id: user.id },
    process.env.JWT_SECRET,
    {
      expiresIn: tokenExpiration,
    }
  );

  const name = user.name;
  const email = user.email;

  const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
    expires: new Date(0),
    path: "/",
  };

  res.cookie(JWT_TOKEN_KEY, "", cookieOptions);
  res.cookie(REMEMBER_USER_KEY, "", cookieOptions);

  cookieOptions.expires = rememberUser ? fullYear() : undefined;

  if (rememberUser) {
    const expiryDate = sessionDuration
      ? new Date(Date.now() + parseInt(sessionDuration, 10) * 3600000)
      : fullYear();
    cookieOptions.expires = expiryDate;

    res.cookie(JWT_TOKEN_KEY, jwtToken, cookieOptions);
  }

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

  res.status(204).json({ message: "Signed out successfully", success: true });
};

module.exports = {
  setCookies,
  removeCookies,
};
