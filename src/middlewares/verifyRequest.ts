import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { isEmpty } from "lodash";
import logger from "../utils/logger";

//* Making sure the request have body, do not use for GET requests

export const verifyBodyRequest: RequestHandler = (req, res, next) => {
  if (isEmpty(req.body)) {
    logger.error("Request have no body!");
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "No body provided!" });
  } else {
    next();
  }
};
