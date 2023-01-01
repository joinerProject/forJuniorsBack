import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../4-models/error-models";
import { Request } from "express";

const secret = "bestProjectEver!!!";
export const encrypt = (password: string): any => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function (err: any, hash: string) {
      if (err) {
        console.log("err", err);
        reject({ error: err });
      } else {
        console.log("hash", hash);

        resolve(hash);
      }
    });
  });
};

// generate a new token - use it when legal user register / login
export const createNewToken = (user: any): string => {
  const payload = { user };
  const token = jwt.sign(payload, secret, { expiresIn: "3h" });
  return token;
};

// checking if the token from request is legal. if not - forbidden to enter
export const VerifyToken = (request: Request): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const header = request.headers.authorization;
    if (!header) {
      reject(new UnauthorizedError("No token sent"));
    }
    const token = header.substring(7);
    if (!token) {
      reject(new UnauthorizedError("No token sent"));
    }
    jwt.verify(token, secret, (err) => {
      if (err) {
        reject(new UnauthorizedError("One or more details is incorrect"));
      }
      resolve(true);
    });
  });
};
