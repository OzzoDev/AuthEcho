const jwt = require("jsonwebtoken");
const { fullYear } = require("../utils/date");

const JWT_TOKEN_KEY = "jwtToken";
const REMEMBER_USER_KEY = "rememberUser";

const setCookies = (req, res) => {
  const { user, rememberUser, statusCode, message } = req.body;

  console.log(req.body);

  const jwtToken = jwt.sign({ email: user.email, _id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
    expires: rememberUser ? fullYear() : undefined,
    path: "/",
  };

  res.cookie(JWT_TOKEN_KEY, jwtToken, cookieOptions);
  res.cookie(REMEMBER_USER_KEY, rememberUser, cookieOptions);

  res.status(statusCode).json({ message, success: true });
};

module.exports = {
  setCookies,
};
