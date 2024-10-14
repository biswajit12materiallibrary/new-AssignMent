import rateLimit from "express-rate-limit";
import { config } from "../config/configEnv";

const RATE_LIMIT: any = config.RATE_LIMIT;
const timeFrame = 60 * 1000; // 1 min in milliseconds
const messageData = {
  success: false,
  data: [],
  message: `You have exceeded the ${RATE_LIMIT} requests in 1 min limit!`,
};

export const rateLimiter = rateLimit({
  windowMs: timeFrame,
  max: RATE_LIMIT,
  message: messageData,
  standardHeaders: true,
  legacyHeaders: false,
});
