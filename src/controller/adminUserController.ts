import { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getAlluser,
  getProfileById,
  login,
  updateUser,
} from "../service/userService";
// import { Request } from "../interface/user";
import { sendResponse } from "../utils/statusCodeResponse";
// import { UserServices } from "../service/userServices";

// import { generateToken } from "../utils/jsonToken";
// import { Request } from "../middleware/authentication";
// import mongoose, { ClientSession } from "mongoose";
// import { v4 as uuidv4 } from "uuid";

export class adminController {
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

  public async getUserById(req: Request, res: Response) {
    try {
      const data = await getProfileById(req.body);
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

  public async getAllUser(req: Request, res: Response) {
    try {
      const data = await getAlluser(req.body);
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

  public async updateUser(req: Request, res: Response) {
    try {
      const data = await updateUser(req.body);
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

  public async deleteUser(req: Request, res: Response) {
    try {
      const data = await deleteUser(req.body);
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
