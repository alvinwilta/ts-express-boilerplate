import { Router } from "express";
import {
  createTicket,
  deleteOneTicket,
  getAllTicket,
  getOneTicket,
} from "../controller/ticket.controller";
import { verifyBodyRequest } from "../middlewares/verifyRequest";
import { verifyToken } from "../middlewares/auth.jwt";

const ticketRoute = Router();

ticketRoute.get("/check", verifyToken, getOneTicket);
ticketRoute.get("/", verifyToken, getAllTicket);
ticketRoute.post("/create", verifyToken, verifyBodyRequest, createTicket);
ticketRoute.delete("/", verifyToken, verifyBodyRequest, deleteOneTicket);

export default ticketRoute;
