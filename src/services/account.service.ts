import Account from "../interfaces/auth.interface";
import AccountModel from "../models/account.model";
import logger from "../utils/logger";
import bcrypt from "bcrypt";
import authConfig from "../config/auth.config";
import { get } from "lodash";
import { decode, sign } from "jsonwebtoken";

export async function createAccount(input: any) {
  try {
    logger.info("Creating account");
    const salt = await bcrypt.genSalt(authConfig.salt);
    const hash = await bcrypt.hashSync(input.password, salt);

    //* You can check for roles or anything similar using lodash's includes
    //* role = constant of role, see constants for an example
    // if (!includes(role, input.role)) {
    //   throw Error("Role not known");
    // }

    // * Check username validity to avoid duplicates
    const uname = input.username;
    const result = await AccountModel.find({ username: uname });
    if (result.length !== 0) {
      throw Error("Username already exists!");
    }
    const doc: Account = new AccountModel({
      username: uname,
      password: hash,
    });
    return await AccountModel.create(doc);
  } catch (error: any) {
    throw error;
  }
}

export function createAccessToken(user: string) {
  try {
    const accessToken = sign({ user: user }, authConfig.accessTokenSecret, {
      expiresIn: authConfig.accessTokenTtl,
    });

    return accessToken;
  } catch (err: any) {
    throw err;
  }
}

export async function refreshAccessToken(refreshToken: string) {
  try {
    const decoded = decode(refreshToken);

    const username = get(decoded, "username");
    // Decode JWT
    if (!decoded || !username) return false;

    const user = await findAccount({ username: username });
    if (!user) return false;

    const accessToken = createAccessToken(user.username);

    return accessToken;
  } catch (err: any) {
    throw err;
  }
}

export async function findAccount(query: any) {
  try {
    return await AccountModel.findOne(query).lean();
  } catch (err: any) {
    throw err;
  }
}

export async function validatePassword(username: string, password: string) {
  try {
    const akun = await AccountModel.findOne({ username });
    if (!akun) return false;
    const isValid = await bcrypt.compare(password, akun.password);
    if (!isValid) return false;

    return isValid;
  } catch (err: any) {
    throw err;
  }
}
