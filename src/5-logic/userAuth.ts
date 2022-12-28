import { encrypt } from "../2-utils/functions";
import { ValidationError } from "../4-models/error-models";
import { UserModel } from "../4-models/user-model";

export default class UserAuth {
  public static async registerUser(request: any, response: any) {
    const { username, password, email, linkedinProfile, phone } = request.body;
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
  }
}
