import { sign, verify } from "jsonwebtoken";
import mongoose from "mongoose";
import UserSchema, { IUser, IUserModel } from "../schemas/User";
import authCodeUtils from "../utils/authCode";

const JWT_SECRET = "secretdoge";
const JWT_EXPIRY = "7d"; // 1 week.

const setTempLoginCode = async (email: string) => {
  const tempLoginCode = authCodeUtils.generateRandomAuthCode();

  const user = await User.findOne({ email });

  // If user already exists, set new temp login code.
  if (user) {
    await user.updateOne({ tempLoginCode });
  } else {
    // If user does not exist, first create it.
    // Then add set new temp login code.
    const _ = new User({ email });
    await _.save();
    await _.updateOne({ tempLoginCode });
  }

  try {
    return tempLoginCode;
  } catch (err) {
    throw err;
  }
};

const confirmTempLoginCode = async (email: string, tempLoginCode: string) => {
  try {
    const user = await User.findOne({ email });

    if (user) {
      if (user.tempLoginCode === tempLoginCode) {
        const token = await user.setAuthToken();
        if (!user.flags.hasLoggedIn) {
          await user.firstLogin();
        }
        return { user, token };
      }
    }
  } catch (err) {
    console.error(err);
  }
};

const setAuthToken = async function (this: IUser) {
  const access = "auth";

  const token = sign(
    {
      email: this.email,
      id: this._id,
      access,
      expiresIn: JWT_EXPIRY,
    },
    JWT_SECRET
  );

  try {
    await this.updateOne({
      $push: { tokens: { access, token } },
      tempLoginCode: "",
    });
    return token;
  } catch (err) {
    throw err;
  }
};

const getUserByToken = async (token: string) => {
  try {
    const decoded = verify(token, JWT_SECRET);
    const { id } = decoded;

    return await User.findOne({
      _id: id,
      "tokens.token": token,
      "tokens.access": "auth",
    });
  } catch (err) {
    console.error(err);
  }
};

const getUserJSON = async (id: string) => {
  try {
    const user = await User.findById(id);

    if (user) {
      const { email, flags } = user;
      return { email, flags };
    } else {
      throw Error("Could not find user.");
    }
  } catch (err) {
    console.error(err);
  }
};

const logout = async (id: string, token: string) => {
  try {
    return await User.findByIdAndUpdate(id, { $pull: { tokens: { token } } });
  } catch (err) {
    throw err;
  }
};

const firstLogin = async function (this: IUser) {
  try {
    await this.updateOne({
      "flags.hasLoggedIn": true,
    });
  } catch (err) {
    throw err;
  }
};

UserSchema.methods.setAuthToken = setAuthToken;

UserSchema.methods.firstLogin = firstLogin;

UserSchema.statics.setTempLoginCode = setTempLoginCode;

UserSchema.statics.confirmTempLoginCode = confirmTempLoginCode;

UserSchema.statics.getUserByToken = getUserByToken;

UserSchema.statics.getUserJSON = getUserJSON;

UserSchema.statics.logout = logout;

const User = mongoose.model<IUser, IUserModel>("User", UserSchema);

export default User;
