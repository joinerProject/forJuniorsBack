import express, { NextFunction, Request, Response } from "express";
import { ValidationError } from "../4-models/error-models";
import { UserModel } from "../4-models/user-model";
import UserAuth from "../5-logic/userAuth";

// import logic from "../5-logic/user-logic";

// const url = "http://localhost:3001"

const router = express.Router();

router.post(
  "/register",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      UserAuth.registerUser(request, response, next);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  "/login",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      // const { password, username } = request.body;
      await UserAuth.loginUser(request, response);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  "/is-exist-user",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await UserAuth.isExsist(request, response);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  "/change-password",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await UserAuth.changePassword(request, response);
    } catch (err: any) {
      next(err);
    }
  }
);
export default router;
