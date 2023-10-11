import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config";
import logger from "../utils/logger";

//* Middleware to verify whether the jwt is valid

export const verifyToken: RequestHandler = (req, res, next) => {
  const authorization =
    req.cookies.jwt || req.headers["authorization"]?.replace("Bearer ", "")[1]; // Authorization: Bearer <token>
  if (!authorization) {
    return res.status(StatusCodes.FORBIDDEN).json({
      msg: "No token provided",
    });
  }
  try {
    logger.info(authorization);
    jwt.verify(
      authorization,
      authConfig.accessTokenSecret,
      (err: any, decoded: any) => {
        if (err) {
          throw err;
        }
        res.locals.decoded = decoded;
      }
    );
    next();
  } catch (err: any) {
    if (err.name !== "JsonWebTokenError") {
      logger.error(err);
    } else {
      logger.error("Invalid token", err);
    }
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: "Invalid authorization",
    });
  }
};
