import { verify } from "jsonwebtoken";
import env from "../../../config/environment";
import { Request, Response, NextFunction } from "express";
const { JWT_SECRET } = env;

// Auth middleware.
const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: "Not authenticated." });
  }

  try {
    const decoded = verify(token, JWT_SECRET);
    // Get the user id from the decoding and put it on the request.
    const { id } = decoded;
    // @ts-ignore
    req.id = id;
    // @ts-ignore
    req.token = token;
  } catch (err) {
    console.error(err);
    return res.status(401).send({ message: "Not authenticated." });
  }

  return next();
};

export default { authenticateUser };
