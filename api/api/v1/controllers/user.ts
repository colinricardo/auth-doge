import User from "../../../models/User";
import { Request, Response, NextFunction } from "express";

const setTempLoginCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  try {
    const tempLoginCode = await User.setTempLoginCode(email);
    // NOTE: here we would connect with Sendgrid / Twilio, etc.
    return res.send({ message: `Temp login code (${tempLoginCode}) sent.` });
  } catch (err) {
    console.error(err);
  }
};

// Checks the temp login code and provisions an auth token.
const confirmTempLoginCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, tempLoginCode } = req.body;

  try {
    const { user, token } = await User.confirmTempLoginCode(
      email,
      tempLoginCode
    );
    return res.send({ user, token });
  } catch (err) {
    return res.status(500).send({ message: "Could not confirm code." });
  }
};

const ping = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.send({ message: "Everything is ok." });
  } catch (err) {
    return res.status(500).send({ message: "Something went wrong." });
  }
};

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const { id } = req;

  try {
    const user = await User.getUserJSON(id);
    return res.send({ user });
  } catch (err) {
    return res.status(500).send({ message: "Something went wrong." });
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const { id, token } = req;

  try {
    const user = await User.logout(id, token);
    return res.send({ user });
  } catch (err) {
    return res.status(500).send({ message: "Something went wrong." });
  }
};

export default {
  setTempLoginCode,
  confirmTempLoginCode,
  ping,
  getProfile,
  logout,
};
