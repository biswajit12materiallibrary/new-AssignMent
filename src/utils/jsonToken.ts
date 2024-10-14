import * as jwt from "jsonwebtoken";
import { config } from "../config/configEnv";

export const generateToken = (payload: any, expiry: string = "15d"): string => {
  return jwt.sign(payload, config?.JWT_SECRET || "test", {
    expiresIn: expiry,
  });
};
