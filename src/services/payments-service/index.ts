import { invalidDataError, notFoundError, unauthorizedError } from "@/errors";
import { PaymentPostType } from "@/protocols";
import paymentRepository from "@/repositories/payments-repository";
import ticketRepository from "@/repositories/tickets-repository";

async function getPayment(ticketId : number | undefined, token: string){
    if(!ticketId) throw invalidDataError(["No ticketId given"])
    
    const ticket = await ticketRepository.checkTicketIdExistence(ticketId)
    if(!ticket) throw notFoundError()

    await ticketRepository.checkTicketOwner(ticketId, token)    

    return paymentRepository.getPaymentInfo(ticketId)
}

async function postPayment(payment: PaymentPostType, token: string){

    const ticket = await ticketRepository.checkTicketIdExistence(payment.ticketId)
    if(!ticket) throw notFoundError()

    await ticketRepository.checkTicketOwner(payment.ticketId, token)    

    await ticketRepository.changePaidStatus(payment.ticketId)
    return await paymentRepository.registerPayment(payment)
}

const paymentsService = {
    getPayment,
    postPayment
};
  
export default paymentsService;