import jwt from "jsonwebtoken";
import { tokenSecret } from "../config";

export function createAccessToken(payload: any):Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      tokenSecret,
      {
        expiresIn: "1h",
      },
      //   callback
      (err: any, token: any) => {
        // Por si salio mal el token
        if (err) reject(err);
        // Si sale bien genera el token
        resolve(token);
      }
    );
  })
}