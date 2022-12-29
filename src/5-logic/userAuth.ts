// import { encrypt } from "../2-utils/functions";
import { ValidationError } from "../4-models/error-models";
import { UserModel } from "../4-models/user-model";
import bcrypt from "bcrypt";
export default class UserAuth {
  public static async registerUser(request: any, response: any) {
    const { username, password, email, linkedinProfile, phone } = request.body;
    !password && new ValidationError("Please set your password");

    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, function (err: any, hash: string) {
        if (err) {
          reject({ error: err });
        } else {
          resolve(hash);
        }
      });
    });
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

  // public static async loginUser(request: any, response: any) {
  //   const { username, password, email, linkedinProfile, phone } = request.body;

  // let user
  // const result = await UserModel.findOne({ email: email })
  //   // if no user then send back an error message
  //   // .then(handle404)

  //     user = result

  //     const correctPassword = await bcrypt.compare(password, user.hashedPassword)

  //     if (correctPassword) {

  //       const token = crypto.randomBytes(16).toString('hex')
  //       // add token to user
  //       user.token = token
  //       // save user
  //       return user.save()
  //     // else then throw error
  //     } else {
  //       throw new BadCredentialsError()
  //     }

  //   // respond with user and the token
  //   .then(user => {
  //     res.status(201).json({ user: user.toObject() })
  // }
}
