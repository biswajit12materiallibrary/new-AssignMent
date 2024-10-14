import { MyUserRequest } from "../interface/user";
import logSchema from "../model/logModel";
export async function sendResponse(
  req: any,
  res: any,
  statusCode: number,
  data: object,
  Log?: object
) {
  // if (Log) {
  Log = {
    eventRecord: {
      body: req.body,
      params: req.params,
      auth: req.headers.authorization,
      query: req.query,
      userDetails: req.user,
      res: data,
    },
  };
  await logSchema.create(Log);
  return res.status(statusCode).send(data);
  // }
  // return res.status(statusCode).send(data);
}
