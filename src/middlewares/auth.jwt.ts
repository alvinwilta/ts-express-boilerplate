import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config";
import logger from "../utils/logger";

//* Middleware to verify whether the jwt is valid

export const verifyToken: RequestHandler = (req, res, next) => {
  const { authorization } = req.body.token || req.query.token || req.headers;
  if (!authorization) {
    return res.status(StatusCodes.FORBIDDEN).json({
      msg: "No token provided",
    });
  }
  try {
    jwt.verify(
      authorization,
      authConfig.accessTokenSecret,
      (err: any, decoded: any) => {
        if (err) {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            msg: "Invalid authorization",
          });
        }
        res.locals.decoded = decoded;
        next();
      }
    );
  } catch (err: any) {
    if (err.name !== "JsonWebTokenError") {
      logger.error(err);
    } else {
      logger.error("Invalid token", err);
    }
  }
};
