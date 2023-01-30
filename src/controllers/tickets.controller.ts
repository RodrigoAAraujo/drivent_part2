import ticketsService from "@/services/tickets-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getUserTickets (req: Request, res: Response){
    const authorized = req.header("Authorization")

    const token = authorized.split(" ")[1]
    try{
        const tickets = await ticketsService.getUserTickets(token)
        return res.status(httpStatus.OK).send(tickets)

    }catch (error) {
        if(error.name === "NotFoundError"){
            return res.sendStatus(httpStatus.NOT_FOUND)
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }

}

export async function getTicketTypes (req: Request, res: Response){
    try{
        const ticketTypes = await ticketsService.getTicketTypes()
        return res.status(httpStatus.OK).send(ticketTypes)
    }catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }

}

export async function postTicket (req: Request, res: Response){
    const {ticketTypeId} = req.body as {ticketTypeId: number}
    const authorized = req.header("Authorization")

    const token = authorized.split(" ")[1]

    try{
        const createdTicket = await ticketsService.postTicket(ticketTypeId, token )
        return res.status(httpStatus.CREATED).send(createdTicket)
        
    }catch (error) {
        if(error.name === "NotFoundError"){
            return res.status(httpStatus.NOT_FOUND).send(error)
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR).send(error);
        
    }

}