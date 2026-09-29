import pino, { type Logger } from "pino";
import { env } from "../config/env.js";

export const logger: Logger = pino({
  level: env.logLevel,
  ...(!env.isProduction && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
        ignore: "pid,hostname",
      },
    },
  }),
});
