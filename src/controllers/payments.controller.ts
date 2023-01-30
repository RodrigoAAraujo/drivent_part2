import { PaymentPostType } from "@/protocols";
import paymentsService from "@/services/payments-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getPayment( req: Request, res: Response){
    const {ticketId} = req.query 
    const authorized = req.header("Authorization")

    const token = authorized.split(" ")[1]

    try{
        const payment = await paymentsService.getPayment(Number(ticketId), token)

        return res.status(httpStatus.OK).send(payment);

    }catch (error) {
        if(error.name === "NotFoundError"){
            return res.status(httpStatus.NOT_FOUND).send(error)
        }
        if(error.name === "InvalidDataError"){
            return res.status(httpStatus.BAD_REQUEST).send(error)
        }
        if(error.name === "UnauthorizedError"){
            return res.status(httpStatus.UNAUTHORIZED).send(error)
        }

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
}

export async function postPayment(req: Request, res: Response){
    const payment = req.body as PaymentPostType
    const authorized = req.header("Authorization")

    const token = authorized.split(" ")[1]

    try{
        const paymentReceival = await paymentsService.postPayment(payment, token)
        return res.status(httpStatus.OK).send(paymentReceival);
        
    }catch (error) {
        if(error.name === "NotFoundError"){
            return res.status(httpStatus.NOT_FOUND).send(error)
        }
        if(error.name === "UnauthorizedError"){
            return res.status(httpStatus.UNAUTHORIZED).send(error)
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
}