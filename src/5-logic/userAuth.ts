// import { encrypt } from "../2-utils/functions";
import { ValidationError } from "../4-models/error-models";
import { UserModel } from "../4-models/user-model";
import bcrypt from "bcrypt";
import { createNewToken, encrypt } from "../2-utils/functions";
export default class UserAuth {
  public static async registerUser(request: any, response: any) {
    const { username, password, email, linkedinProfile, phone } = request.body;

    if (!password) throw new ValidationError("Please set your password");

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
  }

  public static async loginUser(request: any, response: any) {
    const { password, username } = request.body;

    if (!(username && password)) {
      response.status(400).send("All input is required");
    }

    const user = await UserModel.findOne({ username });
    const authenticated = await bcrypt.compare(password, user.password);

    if (user && authenticated) {
      const token = createNewToken(user.toObject());

      return response.status(200).json(token);
    }
    return response.status(400).send("Invalid Credentials");
  }
}
