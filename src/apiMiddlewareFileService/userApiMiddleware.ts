import { Auth } from "../middleware/authentication";
import { Router, Response, NextFunction, RequestHandler } from "express";
import { middlewareObjI } from "../middleware/commonMiddleware";
import { UserController } from "../controller/userController";
import { userManagementValidation } from "../validation/userManagementValidation";

const auth = new Auth();
const userController = new UserController();
// Define the types of the middlewaresDownloadObj to ensure it complies with TypeScript
export const middlewaresUserObj: {
  [key: string]: middlewareObjI;
} = {
  SIGNUP: {
    validation: userManagementValidation.createUser, // The validation is an array of middlewares
    controller: userController.createUser,
  },
  LOGIN: {
    validation: userManagementValidation.login, // The validation is an array of middlewares
    controller: userController.login,
  },

  PROFILE: {
    validation: userManagementValidation.baseAuth, // The validation is an array of middlewares
    auth: auth.authentication,
    controller: userController.getProfileById,
  },
};
