import { RequestHandler } from "express";
import logger from "../utils/logger";
import {
  createOneTicketService,
  findOneTicketService,
  sendEmailService,
} from "../services/tiket.service";
import { StatusCodes } from "http-status-codes";
import generateToken from "../utils/generate_token";

//* Basic document creation and checking with MongoDB

export const createTicket: RequestHandler = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    //* generate token
    const token = generateToken(8);

    //* create ticket
    const tiket = await createOneTicketService(token, name);

    //* send email (OPTIONAL)
    await sendEmailService(email, token);

    logger.info("Ticket created");
    res.status(StatusCodes.OK).json({ msg: "Ticket created", data: tiket });
  } catch (err: any) {
    logger.error(err);
    res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message, err: err });
  }
};

export const getOneTicket: RequestHandler = async (req, res) => {
  const token = req.query.token as string;
  logger.info(`Get one ticket with token: ${token}`);
  try {
    const tik = await findOneTicketService({ token: token });
    if (!tik) {
      logger.info("Ticket not found!");
      return res.status(StatusCodes.OK).json({ msg: "No ticket found" });
    }
    logger.info("Ticket Found");
    return res.status(200).json({
      token: token,
      data: tik,
    });
  } catch (err: any) {
    logger.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err });
  }
};
