import { Document, Model, Schema } from "mongoose";

// Here we define regular methods.
export interface IUser extends Document {
  email: string;
  tempLoginCode: string;
  tokens: [
    {
      access: string;
      token: string;
    }
  ];
  flags: {
    hasLoggedIn: boolean;
  };

  setAuthToken();
  firstLogin();
}

// Here we define static methods.
export interface IUserModel extends Model<IUser> {
  setTempLoginCode(email: string);
  confirmTempLoginCode(email: string, tempLoginCode: string);
  getUserByToken(token: string): IUser;
  getUserJSON(id: string);
  logout(id: string, token: string);
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    tempLoginCode: { type: String },
    tokens: [{ access: { type: String }, token: { type: String } }],
    flags: {
      hasLoggedIn: { type: Boolean, default: false },
    },
  },
  { minimize: false }
);

export default UserSchema;
