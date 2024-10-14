import { NextFunction, Request, Response } from "express";
import { check, body, validationResult } from "express-validator";
import { sendResponse } from "../utils/statusCodeResponse";
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
export const userManagementValidation = {
  baseAuth: [
    check("authorization")
      .exists({ checkFalsy: true })
      .withMessage("Please Provide Your Token")
      .customSanitizer((value) => value?.split(" ")[1])
      .isJWT()
      .withMessage("token is not valid"),

    (req: Request, res: Response, next: NextFunction) => {
      const errors: any = validationResult(req);
      if (!errors.isEmpty())
        return sendResponse(req, res, 200, {
          success: false,
          data: {},
          message: errors.errors[0].msg,
          statusCode: 422,
        });
      next();
    },
  ],

  changePassword: [
    check("authorization")
      .exists({ checkFalsy: true })
      .withMessage("Please Provide Your Token")
      .customSanitizer((value) => value?.split(" ")[1])
      .isJWT()
      .withMessage("token is not valid"),

    body("oldPassword")
      .exists({ checkFalsy: true })
      .withMessage("Old Password Is Required")
      .isString()
      .withMessage("Old Password Is Text With Alph Numeric Combination")
      .isLength({ min: 8 })
      .withMessage("Old Password Must be at Least 8 Characters"),

    body("newPassword")
      .exists({ checkFalsy: true })
      .withMessage("New Password Is Required")
      .isString()
      .withMessage("New Password Is Text With Alph Numeric Combination")
      .isLength({ min: 8, max: 12 })
      .withMessage("New Password  Must be 8 to 12 Characters")
      .custom((value) => {
        if (!passwordRegex.test(value)) {
          const errors = [];

          if (!/[A-Z]/.test(value)) {
            errors.push("New Password Must have At Least One Capital Letter.");
          }
          if (!/[!@#$%^&*()_+\-=;':"|,.<>/?]+/.test(value)) {
            errors.push(
              "New Password Must contain At least One Special Character."
            );
          }
          if (!/[0-9]+/.test(value)) {
            errors.push("New Password Must Contain At Least One Number.");
          }
          if (/\s/.test(value)) {
            errors.push("New Password Must Not Contain Spaces.");
          }

          if (errors.length > 0) {
            throw errors[0];
          }
        }

        return true;
      }),

    (req: Request, res: Response, next: NextFunction) => {
      const errors: any = validationResult(req);
      if (!errors.isEmpty())
        return sendResponse(req, res, 200, {
          success: false,
          data: {},
          message: errors.errors[0].msg,
          statusCode: 422,
        });
      next();
    },
  ],
  getAllUser: [
    check("authorization")
      .exists({ checkFalsy: true })
      .withMessage("Please Provide Your Token")
      .customSanitizer((value) => value?.split(" ")[1])
      .isJWT()
      .withMessage("token is not valid"),

    body("search").optional({ checkFalsy: true }).trim(),
    body("skip").optional().isInt({ min: 0, max: 10000 }),
    body("limit").optional().isInt({ min: 0, max: 10000 }),
    body("pageNo").optional().isInt({ min: 0, max: 10000 }),
    body("sort").optional(),

    (req: Request, res: Response, next: NextFunction) => {
      const errors: any = validationResult(req);
      if (!errors.isEmpty())
        return sendResponse(req, res, 200, {
          success: false,
          data: {},
          message: errors.errors[0].msg,
          statusCode: 422,
        });
      next();
    },
  ],

  deleteUser: [
    check("authorization")
      .exists({ checkFalsy: true })
      .withMessage("Please Provide Your Token")
      .customSanitizer((value) => value?.split(" ")[1])
      .isJWT()
      .withMessage("token is not valid"),

    body("userId")
      .exists({ checkFalsy: true })
      .withMessage("User Id is required")
      .isString()
      .withMessage("User Id Type String"),

    (req: Request, res: Response, next: NextFunction) => {
      const errors: any = validationResult(req);
      if (!errors.isEmpty())
        return sendResponse(req, res, 200, {
          success: false,
          data: {},
          message: errors.errors[0].msg,
          statusCode: 422,
        });
      next();
    },
  ],

  getUser: [
    check("authorization")
      .exists({ checkFalsy: true })
      .withMessage("Please Provide Your Token")
      .customSanitizer((value) => value?.split(" ")[1])
      .isJWT()
      .withMessage("token is not valid"),

    body("skip").optional().isInt({ min: 0, max: 10000 }),
    body("limit").optional().isInt({ min: 0, max: 10000 }),

    (req: Request, res: Response, next: NextFunction) => {
      const errors: any = validationResult(req);
      if (!errors.isEmpty())
        return sendResponse(req, res, 200, {
          success: false,
          data: {},
          message: errors.errors[0].msg,
          statusCode: 422,
        });
      next();
    },
  ],

  createUser: [
    body("name")
      .exists({ checkFalsy: true })
      .withMessage(" Name is Required")
      .isString()
      .withMessage(" Name should be a text format.")
      .isLength({ min: 3, max: 50 })
      .withMessage(" Name should be min 3 and max 50 characters in length.")
      .trim()
      .toLowerCase()
      .customSanitizer((str) => str.charAt(0).toUpperCase() + str.slice(1)),

    body("email")
      .exists({ checkFalsy: true })
      .withMessage("Email is Required")
      .isEmail()
      .withMessage("Email should be a email format.")
      .isLength({ min: 5, max: 50 })
      .withMessage("Email should be min 5 and max 50 characters in length.")
      .trim()
      .toLowerCase(),

    body("password")
      .exists({ checkFalsy: true })
      .withMessage("New Password Is Required")
      .isString()
      .withMessage("New Password Is Text With Alph Numeric Combination")
      .isLength({ min: 8, max: 16 })
      .withMessage("New Password  Must be 8 to 16 Characters")
      .custom((value) => {
        if (!passwordRegex.test(value)) {
          const errors = [];

          if (!/[A-Z]/.test(value)) {
            errors.push("New Password Must have At Least One Capital Letter.");
          }
          if (!/[!@#$%^&*()_+\-=;':"|,.<>/?]+/.test(value)) {
            errors.push(
              "New Password Must contain At least One Special Character."
            );
          }
          if (!/[0-9]+/.test(value)) {
            errors.push("New Password Must Contain At Least One Number.");
          }
          if (/\s/.test(value)) {
            errors.push("New Password Must Not Contain Spaces.");
          }

          if (errors.length > 0) {
            throw errors[0];
          }
        }

        return true;
      }),

    body("role")
      .exists({ checkFalsy: true })
      .withMessage("role is Required")
      .isString()
      .withMessage("role should be a text format.")
      .trim()
      .toLowerCase()
      .custom((value) => {
        if (!["admin", "user"].includes(value)) {
          throw new Error("Invalid role Type");
        }
        return value;
      })
      .withMessage("role Type Should be admin or user"), // Custom error message,

    (req: Request, res: Response, next: NextFunction) => {
      const errors: any = validationResult(req);
      if (!errors.isEmpty())
        return sendResponse(req, res, 200, {
          success: false,
          data: {},
          message: errors.errors[0].msg,
          statusCode: 422,
        });
      next();
    },
  ],

  createByAdminUser: [
    check("authorization")
      .exists({ checkFalsy: true })
      .withMessage("Please Provide Your Token")
      .customSanitizer((value) => value?.split(" ")[1])
      .isJWT()
      .withMessage("token is not valid"),

    body("name")
      .exists({ checkFalsy: true })
      .withMessage(" Name is Required")
      .isString()
      .withMessage(" Name should be a text format.")
      .isLength({ min: 3, max: 50 })
      .withMessage(" Name should be min 3 and max 50 characters in length.")
      .trim()
      .toLowerCase()
      .customSanitizer((str) => str.charAt(0).toUpperCase() + str.slice(1)),

    body("email")
      .exists({ checkFalsy: true })
      .withMessage("Email is Required")
      .isEmail()
      .withMessage("Email should be a email format.")
      .isLength({ min: 5, max: 50 })
      .withMessage("Email should be min 5 and max 50 characters in length.")
      .trim()
      .toLowerCase(),

    body("password")
      .exists({ checkFalsy: true })
      .withMessage("New Password Is Required")
      .isString()
      .withMessage("New Password Is Text With Alph Numeric Combination")
      .isLength({ min: 8, max: 16 })
      .withMessage("New Password  Must be 8 to 16 Characters")
      .custom((value) => {
        if (!passwordRegex.test(value)) {
          const errors = [];

          if (!/[A-Z]/.test(value)) {
            errors.push("New Password Must have At Least One Capital Letter.");
          }
          if (!/[!@#$%^&*()_+\-=;':"|,.<>/?]+/.test(value)) {
            errors.push(
              "New Password Must contain At least One Special Character."
            );
          }
          if (!/[0-9]+/.test(value)) {
            errors.push("New Password Must Contain At Least One Number.");
          }
          if (/\s/.test(value)) {
            errors.push("New Password Must Not Contain Spaces.");
          }

          if (errors.length > 0) {
            throw errors[0];
          }
        }

        return true;
      }),

    body("role")
      .exists({ checkFalsy: true })
      .withMessage("role is Required")
      .isString()
      .withMessage("role should be a text format.")
      .trim()
      .toLowerCase()
      .custom((value) => {
        if (!["admin", "user"].includes(value)) {
          throw new Error("Invalid role Type");
        }
        return value;
      })
      .withMessage("role Type Should be admin or user"), // Custom error message,

    (req: Request, res: Response, next: NextFunction) => {
      const errors: any = validationResult(req);
      if (!errors.isEmpty())
        return sendResponse(req, res, 200, {
          success: false,
          data: {},
          message: errors.errors[0].msg,
          statusCode: 422,
        });
      next();
    },
  ],

  login: [
    body("email")
      .exists({ checkFalsy: true })
      .withMessage("Email is Required")
      .isEmail()
      .withMessage("Email should be a text format.")
      .isLength({ min: 5, max: 50 })
      .withMessage("Email should be min 5 and max 50 characters in length.")
      .trim()
      .toLowerCase(),

    body("password")
      .exists({ checkFalsy: true })
      .withMessage("Password is Required")
      .isString()
      .withMessage("Password should be a text format.")
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)
      .withMessage("Password should be alpha numeric 12 characters in length.")
      .trim(),

    (req: Request, res: Response, next: NextFunction) => {
      const errors: any = validationResult(req);
      if (!errors.isEmpty())
        return sendResponse(req, res, 200, {
          success: false,
          data: {},
          message: errors.errors[0].msg,
          statusCode: 422,
        });
      next();
    },
  ],

  updateUser: [
    check("authorization")
      .exists({ checkFalsy: true })
      .withMessage("Please Provide Your Token")
      .customSanitizer((value) => value?.split(" ")[1])
      .isJWT()
      .withMessage("token is not valid"),

    body("email")
      .optional({ checkFalsy: true })
      .isEmail()
      .withMessage("Email should be a text format.")
      .isLength({ min: 5, max: 50 })
      .withMessage("Email should be min 5 and max 50 characters in length.")
      .trim()
      .toLowerCase(),

    body("userId")
      .exists({ checkFalsy: true })
      .withMessage("User Id is required")
      .isString()
      .withMessage("User Id is String type"),

    body("role")
      .optional({ checkFalsy: true })
      .isString()
      .withMessage("Role must be a string")
      .toLowerCase()
      .custom((value) => {
        if (!["admin", "user"].includes(value)) {
          throw new Error("Invalid role Type");
        }
        return value;
      })
      .withMessage("role Type Should be admin or user"), // Custom error message,,

    body("name")
      .optional({ checkFalsy: true })
      .isString()
      .withMessage("Name must be a string")
      .isLength({ min: 1 })
      .withMessage("Name cannot be empty"),

    (req: Request, res: Response, next: NextFunction) => {
      const errors: any = validationResult(req);
      if (!errors.isEmpty())
        return sendResponse(req, res, 200, {
          success: false,
          data: {},
          message: errors.errors[0].msg,
          statusCode: 422,
        });
      next();
    },
  ],

  deleteuser: [
    check("authorization")
      .exists({ checkFalsy: true })
      .withMessage("Please Provide Your Token")
      .customSanitizer((value) => value?.split(" ")[1])
      .isJWT()
      .withMessage("token is not valid"),

    body("email")
      .exists({ checkFalsy: true })
      .withMessage("Email is Required")
      .isEmail()
      .withMessage("Email should be a text format.")
      .isLength({ min: 5, max: 50 })
      .withMessage("Email should be min 5 and max 50 characters in length.")
      .trim()
      .toLowerCase(),

    body("password")
      .exists({ checkFalsy: true })
      .withMessage("Password is Required")
      .isString()
      .withMessage("Password should be a text format.")
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)
      .withMessage("Password should be alpha numeric 12 characters in length.")
      .trim(),

    (req: Request, res: Response, next: NextFunction) => {
      const errors: any = validationResult(req);
      if (!errors.isEmpty())
        return sendResponse(req, res, 200, {
          success: false,
          data: {},
          message: errors.errors[0].msg,
          statusCode: 422,
        });
      next();
    },
  ],
};
