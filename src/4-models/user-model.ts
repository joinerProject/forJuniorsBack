import mongoose from "mongoose";

export interface IUserModel extends mongoose.Document {
  username: string;
  phone?: string;
  password: string;
  email: string;
  linkedinProfile: string;
}

export const UserSchema = new mongoose.Schema<IUserModel>(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Missing username"],
      minLength: [2, "Username too short"],
      maxLength: [20, "Username too long"],
    },
    phone: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: [true, "Missing password"],
      minLength: [5, "Password too short"],
      maxLength: [150, "Password too long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    linkedinProfile: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
    toObject: {
      transform: (_doc, user) => {
        delete user.password;
        return user;
      },
    },
  }
);

export const UserModel = mongoose.model<IUserModel>(
  "UserModel",
  UserSchema,
  "users"
);
