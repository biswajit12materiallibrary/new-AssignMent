import { Request, Response } from "express";
import { createUser, getProfileById, login } from "../service/userService";
// import { Request } from "../interface/user";
import { sendResponse } from "../utils/statusCodeResponse";
import { MyUserRequest } from "../interface/user";
import { CustomUserRequest } from "../middleware/commonMiddleware";
// import { UserServices } from "../service/userServices";

// import { generateToken } from "../utils/jsonToken";
// import { Request } from "../middleware/authentication";
// import mongoose, { ClientSession } from "mongoose";
// import { v4 as uuidv4 } from "uuid";

export class UserController {
  // super user signup
  public async createUser(req: Request, res: Response) {
    try {
      const data = await createUser(req.body);
      if (!data?.success) {
        throw new Error(data?.message || "SomeThing Went Wrong");
      }
      return sendResponse(req, res, 200, data);
    } catch (error) {
      return sendResponse(req, res, 200, {
        success: false,
        data: {},
        message: error.message,
        statusCode: 404,
      });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const data = await login(req.body);
      if (!data?.success) {
        throw new Error(data?.message || "SomeThing Went Wrong");
      }
      return sendResponse(req, res, 200, data);
    } catch (error) {
      return sendResponse(req, res, 200, {
        success: false,
        data: {},
        message: error.message,
        statusCode: 404,
      });
    }
  }

  public async getProfileById(req: CustomUserRequest, res: Response) {
    try {
      const data = await getProfileById(req.user);
      if (!data?.success) {
        throw new Error(data?.message || "SomeThing Went Wrong");
      }
      return sendResponse(req, res, 200, data);
    } catch (error) {
      return sendResponse(req, res, 200, {
        success: false,
        data: {},
        message: error.message,
        statusCode: 404,
      });
    }
  }
}
