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
      console.log("request from controller", request.body);
      UserAuth.registerUser(request, response);
      
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
