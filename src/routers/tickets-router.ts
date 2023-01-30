import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { ticketPostSchema } from "@/schemas";
import { getTicketTypes, getUserTickets, postTicket } from "@/controllers/tickets.controller";

const ticketsRouters = Router();

ticketsRouters
    .all("/*", authenticateToken)
    .get("/", getUserTickets)
    .get("/types", getTicketTypes )
    .post("/", validateBody(ticketPostSchema), postTicket )

export { ticketsRouters };