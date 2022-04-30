import { Router } from "express";
import { createTicket, getOneTicket } from "../controller/tiket.controller";
import { verifyBodyRequest } from "../middlewares/verifyRequest";

const ticketRoute = Router();

ticketRoute.get("/check", getOneTicket);
ticketRoute.post("/create", verifyBodyRequest, createTicket);

export default ticketRoute;
