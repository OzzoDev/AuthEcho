const jwt = require("jsonwebtoken");
const JWT_APP_TOKEN_KEY = "jwtAppToken";
// const JWT_APP_SECRET = process.env.JWT_APP_SECRET;
const JWT_APP_SECRET = "as568bca28c6a25cad29yu0349294e3e72826fae5efgytwfrsh76cf9674ec5f8fed0";

const ensureAuthenticated = (req, res, next) => {
  const jwtToken = req.cookies[JWT_APP_TOKEN_KEY];

  if (!jwtToken) {
    return res.status(401).json({ message: "Please sign in to continue", success: false });
  }

  try {
    jwt.verify(jwtToken, process.env.JWT_APP_SECRET);

    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Your session has expired. Please sign in again", success: false });
  }
};

const ensureIsAdmin = (req, res, next) => {
  const jwtToken = req.cookies[JWT_APP_TOKEN_KEY];

  if (!jwtToken) {
    return res.status(401).json({ message: "Please sign in to continue", success: false });
  }

  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_APP_SECRET);

    const isAdmin = decoded.isAdmin;

    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Access denied: insufficient permissions", success: false });
    }

    next();
  } catch (error) {
    console.log(error);

    return res
      .status(403)
      .json({ message: "Your session has expired. Please sign in again", success: false });
  }
};

module.exports = {
  ensureAuthenticated,
  ensureIsAdmin,
};
