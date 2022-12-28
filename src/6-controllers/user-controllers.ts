import express, { NextFunction, Request, Response } from "express";
import { encrypt } from "../2-utils/functions";
import { ValidationError } from "../4-models/error-models";
import { UserModel } from "../4-models/user-model";

// import logic from "../5-logic/user-logic";

// const url = "http://localhost:3001"

const router = express.Router();

router.post(
  "/api/auth/register",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { username, password, email, linkedinProfile, phone } =
        request.body;
      !password && new ValidationError("Please set your password");

      const hashedPassword = await encrypt(password);
      const newUser = {
        username: username,
        password: hashedPassword,
        email: email,
        linkedinProfile: linkedinProfile,
        phone: phone,
      };

      const user = await UserModel.create(newUser);

      return response.status(201).json({ user: user.toObject() });
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
