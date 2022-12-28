import bcrypt from "bcrypt";

export const encrypt = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const hashSaltRounds = 10;

    // crypt hash
    bcrypt.hash(password, hashSaltRounds, function (err: any, hash: string) {
      if (err) {
        reject({ error: err });
      } else {
        resolve(hash);
      }
    });
  });
};
