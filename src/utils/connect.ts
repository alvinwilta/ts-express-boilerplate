import mongoose from "mongoose";
import config from "../config/config";
import logger from "./logger";

async function connectDB() {
  try {
    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000,
    };
    let url = config.mongo.url_local;
    if (process.env.ENV === "PROD") {
      url = config.mongo.url_server;
    } else if (process.env.ENV === "TEST") {
      url = config.mongo.url_test;
    }
    await mongoose.connect(url, options);
    logger.info({ msg: "Connected to mongodb" });
  } catch (err) {
    logger.error({ msg: "Error connecting to mongodb", val: err });
    process.exit(1);
  }
}

export default connectDB;
