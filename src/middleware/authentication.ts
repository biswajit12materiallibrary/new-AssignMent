import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import UserSchema from "../model/userModel";
import { config } from "../config/configEnv";
import { sendResponse } from "../utils/statusCodeResponse";

export class Auth {
  public async authentication(req: any, res: Response, next: NextFunction) {
    try {
      let token;
      if (req.headers.authorization) {
        token = req.headers.authorization;

        if (!token) {
          throw new Error("Not Authorized, Token Failed ");
        }
        let decode: object;
        try {
          decode = <any>jwt.verify(token, config?.JWT_SECRET || "test");
        } catch (error) {
          decode = {};
        }
        if (!decode) {
          throw new Error("Not Authorized, Token Failed ");
        }
        req.user = decode;

        next();
      } else {
        throw new Error("Not Authorized, Token Failed ");
      }
    } catch (error) {
      return sendResponse(req, res, 200, {
        success: false,
        data: {},
        message: error.message,
      });
    }
  }

  public async authorization(req: any, res: Response, next: NextFunction) {
    try {
      if (req.user.role === "admin") {
        next();
      } else {
        throw new Error("Not Authorized, For api ");
      }
    } catch (error) {
      return sendResponse(req, res, 200, {
        success: false,
        data: {},
        message: error.message,
      });
    }
  }
}
