import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      res.cookie("token", "");

      return res
        .status(401)
        .json({ message: "Invalid token, authorization denied" });
    }

    req.user = user;

    next();
  });
};
