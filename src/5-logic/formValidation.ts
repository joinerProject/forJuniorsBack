import { ValidationError } from "../4-models/error-models";
import { UserModel } from "../4-models/user-model";
import { NextFunction } from "express";

export const validateUniqueFields = async (
  username: string,
  email: string,
  linkedinProfile: string,
  next: NextFunction
) => {
  try {
    const usernameExists = await UserModel.findOne({ username });
    const emailExists = await UserModel.findOne({ email });
    const linkedinProfileExists = await UserModel.findOne({
      linkedinProfile,
    });
    if (usernameExists || emailExists || linkedinProfileExists) {
      let invalidFields: Array<boolean | string> = [
        usernameExists && "username",
        emailExists && "email",
        linkedinProfileExists && "linkedIn profile",
      ];

      console.log(invalidFields);

      const strigOfInvalidFields = invalidFields
        .filter((e) => e !== false)
        .join(", ");

      throw new ValidationError(
        `This ${strigOfInvalidFields} is already registered, you can login or try again with a different username`
      );
    }
  } catch (e) {
    next(e);

    // return invalidFields;
  }
};
