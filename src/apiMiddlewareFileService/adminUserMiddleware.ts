import { Auth } from "../middleware/authentication";
import { Router, Response, NextFunction, RequestHandler } from "express";
import { middlewareObjI } from "../middleware/commonMiddleware";
import { UserController } from "../controller/userController";
import { userManagementValidation } from "../validation/userManagementValidation";
import { adminController } from "../controller/adminUserController";

const auth = new Auth();
const admincontroller = new adminController();
// Define the types of the middlewaresDownloadObj to ensure it complies with TypeScript
export const middlewaresAdminObj: {
  [key: string]: RequestHandler[];
} = {
  CREATEUSER: [
    ...userManagementValidation.createByAdminUser, // The validation is an array of middlewares
    auth.authentication,
    auth.authorization,
    admincontroller.createUser,
  ],

  GETALLUSER: [
    ...userManagementValidation.getAllUser, // The validation is an array of middlewares
    auth.authentication,
    auth.authorization,
    admincontroller.getAllUser,
  ],
  UPADATEUSER: [
    ...userManagementValidation.updateUser, // The validation is an array of middlewares
    auth.authentication,
    auth.authorization,
    admincontroller.updateUser,
  ],
  DELETEUSER: [
    ...userManagementValidation.deleteUser, // The validation is an array of middlewares
    auth.authentication,
    auth.authorization,
    admincontroller.deleteUser,
  ],
};
