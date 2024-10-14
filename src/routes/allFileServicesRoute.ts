import { Router, Response, NextFunction, RequestHandler } from "express";
// import { MyUserRequest } from "";
import { middlewaresUserObj } from "../apiMiddlewareFileService/userApiMiddleware";
import { allRouteFuctionMiddleware } from "../middleware/commonMiddleware";
import { middlewaresAdminObj } from "../apiMiddlewareFileService/adminUserMiddleware";

export const allFileServicesRouter = Router();

allFileServicesRouter.post(
  "/user/:endpointKey",
  allRouteFuctionMiddleware(middlewaresUserObj)
);

allFileServicesRouter.post(
  "/admin/:endpointKey",
  allRouteFuctionMiddleware(middlewaresAdminObj)
);
