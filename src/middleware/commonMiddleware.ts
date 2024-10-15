import {
  Request as ExpressRequest,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
// import { Request } from "../interface/user";
import { sendResponse } from "../utils/statusCodeResponse";
import { param } from "express-validator";
import { AuthMechanism } from "typeorm";

export interface middlewareObjI {
  validation?: RequestHandler[];
  auth?: RequestHandler;
  multerMiddleware?: RequestHandler;
  authorization?: RequestHandler;
  controller: RequestHandler;
}

export function nextMiddleware(
  req: CustomUserRequest,
  res: Response,
  next: NextFunction,
  middlewares: any[],
  index: number
) {
  if (index >= middlewares.length) return next(); // End of middlewares, move to next
  middlewares[index](req, res, (err: any) => {
    if (err) return next(err); // If any error occurs, pass it to the error handler
    nextMiddleware(req, res, next, middlewares, index + 1); // Move to the next middleware
  });
}
export interface CustomUserRequest extends ExpressRequest {
  params: {
    endpointKey?: string;
  };
  body: {
    downloadKey?: string;
  };
  user?: any;
  files?: any;
}
export const allRouteFuctionMiddleware = (
  middlewareObj: Record<string, RequestHandler[]>
): RequestHandler => {
  return (req: CustomUserRequest, res: Response, next: NextFunction) => {
    let downloadKey: string =
      req?.params?.endpointKey?.toUpperCase() ||
      req?.body?.downloadKey?.toUpperCase() ||
      "";

    if (!middlewareObj[downloadKey]) {
      sendResponse(req, res, 404, {
        success: false,
        error: "Invalid api key",
        data: {},
        statusCode: 404,
      });
    }
    // Dynamically extract middlewares based on the downloadKey
    const oneObjForApiBykey: RequestHandler[] = middlewareObj[downloadKey];

    // Apply the middleware chain dynamically
    return nextMiddleware(req, res, next, oneObjForApiBykey, 0);
  };
};
