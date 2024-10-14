import { NextFunction, Request, Response } from "express";
import { check, validationResult, body } from "express-validator";
import { sendResponse } from "../utils/statusCodeResponse";

export const baseValidation = {
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
};
