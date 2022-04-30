import { Schema, Types, model, Document, ObjectId } from "mongoose";
import Account from "../interfaces/auth.interface";
import modelConstants from "../constants/schema_names";

//* Basic schema for account

const accountSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    collection: modelConstants.account,
  }
);

const AccountModel = model<Account>(modelConstants.account, accountSchema);
export default AccountModel;
