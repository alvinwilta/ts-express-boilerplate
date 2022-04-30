import { Ticket, Time } from "../interfaces/ticket.interface";
import TicketModel from "../models/ticket.model";
import logger from "../utils/logger";
import dayjs from "dayjs";
import nodemailer from "nodemailer";
import config from "../config/config";

//* Create one ticket
export async function createOneTicketService(token: string, name: string) {
  try {
    const time = <Time>{
      start: dayjs().format(),
      end: "",
    };
    const tiket = <Ticket>{
      token: token,
      name: name,
      period: time,
    };
    return await TicketModel.create(tiket);
  } catch (error: any) {
    logger.error(error);
    throw Error(error);
  }
}

export async function findOneTicketService(query: any) {
  try {
    return await TicketModel.findOne(query);
  } catch (err: any) {
    logger.error(err);
    throw err;
  }
}

//* Send email
export async function sendEmailService(email: string, token: string) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: config.mailer.service,
    auth: {
      user: config.mailer.email, // generated ethereal user
      pass: config.mailer.password, // generated ethereal password
    },
  });

  // send mail with defined transport object
  return await transporter.sendMail({
    from: `"${config.mailer.email}`, // sender address
    to: email, // list of receivers
    subject: "[no-reply] This is the subject", // Subject line
    text: "This is the body", // plain text body
  });
}
