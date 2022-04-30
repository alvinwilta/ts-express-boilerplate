import authRoute from "./auth.route";
import ticketRoute from "./ticket.route";

export default function setupRoute(app: any) {
  app.use("/ticket", ticketRoute);
  app.use("/auth", authRoute);
}
