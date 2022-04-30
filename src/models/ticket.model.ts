import { Schema, model } from "mongoose";
import modelConstants from "../constants/schema_names";
import { Ticket } from "../interfaces/ticket.interface";

//* Basic schema for ticket

const tiketSchema = new Schema(
  {
    token: { type: String, required: true },
    name: { type: String, required: true },
    period: {
      start: { type: Date },
      end: { type: Date },
    },
  },
  {
    collection: modelConstants.ticket,
  }
);

const TicketModel = model<Ticket>(modelConstants.ticket, tiketSchema);
export default TicketModel;
