import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const SECRET = "adfdgjudsgidisghdis";
const REFRESH_SECRET = "adfdgjudsgidisghdis";

const authConfig = {
  accessTokenSecret: process.env.SECRET || SECRET,
  refreshTokenSecret: process.env.REFRESH_SECRET || REFRESH_SECRET,
  salt: 10,
  accessTokenTtl: 15 * 60 * 1000,
  refreshTokenTtl: 365 * 24 * 60 * 1000,
};

export default authConfig;
