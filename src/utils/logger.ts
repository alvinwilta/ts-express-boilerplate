import logger from "pino";
import PinoPretty from "pino-pretty";

const log = logger(
  PinoPretty({ colorize: true, translateTime: true, ignore: "pid,hostname" })
);

export default log;
