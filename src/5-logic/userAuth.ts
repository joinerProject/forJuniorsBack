// import { encrypt } from "../2-utils/functions";
import { UnauthorizedError, ValidationError } from "../4-models/error-models";
import { UserModel } from "../4-models/user-model";
import bcrypt from "bcrypt";
import { createNewToken, encrypt } from "../2-utils/functions";
import { NextFunction, Request, Response } from "express";
import { validateUniqueFields } from "./formValidation";
export default class UserAuth {
  public static async registerUser(
    request: any,
    response: any,
    next: NextFunction
  ) {
    const { username, password, email, linkedinProfile, phone } = request.body;
    try {
      validateUniqueFields(username, email, linkedinProfile, next);

      const hashedPassword = await encrypt(password);
      const newUser = {
        username: username,
        password: hashedPassword,
        email: email,
        linkedinProfile: linkedinProfile,
        phone: phone,
      };

      const user = await UserModel.create(newUser);

      const token = createNewToken(user.toObject());

      return response.status(201).json(token);
    } catch (e) {
      next(e);
    }
  }

  public static async loginUser(request: any, response: any) {
    console.log("<<<<<<<<<<<<", request.body);
    const { password, username } = request.body;

    if (!(username && password)) {
      return response.status(400).send("All input is required");
    }

    const user = await UserModel.findOne({ username });
    const authenticated = await bcrypt.compare(password, user?.password);

    if (user && authenticated) {
      const token = createNewToken(user.toObject());

      return response.status(200).json(token);
    }
    return response.status(400).send("Invalid Credentials");
  }

  public static async isExsist(request: Request, response: Response) {
    const { username, mail } = request.body;
    const isExist = await UserModel.findOne({ username: username, mail: mail });
    if (!isExist)
      return response.status(401).json(`Username or mail are worng.`);
    return response.status(200).json(isExist);
  }

  public static async changePassword(request: Request, response: Response) {
    const { id, password } = request.body;
    const encryptPassword = await encrypt(password);
    const update = await UserModel.findByIdAndUpdate(
      { _id: id },
      { $set: { password: encryptPassword } },
      (err, updated) => {
        if (err) {
          return response.status(400).json(err);
        }
        const token = createNewToken(updated);
        return response.status(201).json(token);
      }
    );
  }
}
