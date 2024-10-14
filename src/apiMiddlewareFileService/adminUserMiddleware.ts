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
  [key: string]: middlewareObjI;
} = {
  CREATEUSER: {
    validation: userManagementValidation.createByAdminUser, // The validation is an array of middlewares
    auth: auth.authentication,
    authorization: auth.authorization,
    controller: admincontroller.createUser,
  },

  GETALLUSER: {
    validation: userManagementValidation.getAllUser, // The validation is an array of middlewares
    auth: auth.authentication,
    authorization: auth.authorization,
    controller: admincontroller.getAllUser,
  },
  UPADATEUSER: {
    validation: userManagementValidation.updateUser, // The validation is an array of middlewares
    auth: auth.authentication,
    authorization: auth.authorization,
    controller: admincontroller.updateUser,
  },
  DELETEUSER: {
    validation: userManagementValidation.deleteUser, // The validation is an array of middlewares
    auth: auth.authentication,
    authorization: auth.authorization,
    controller: admincontroller.deleteUser,
  },
};
