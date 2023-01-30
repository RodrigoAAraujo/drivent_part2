import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import sessionRepository from "@/repositories/session-repository";
import ticketRepository from "@/repositories/tickets-repository";


async function getUserTickets(token: string){

    const userId = await sessionRepository.findUserIdByToken(token) 

    const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId)
    if(!enrollment) throw notFoundError()
    

    const tickets = await ticketRepository.getUserTickets(enrollment.id)
    if(!tickets) throw notFoundError()
    
    return tickets
}

async function getTicketTypes(){
    return await ticketRepository.getTicketTypes()
}


async function postTicket(ticketTypeId: number, token: string) {

    const userId = await sessionRepository.findUserIdByToken(token) 

    const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId)
    if(!enrollment) throw notFoundError()

    return await ticketRepository.registerTicket(ticketTypeId, enrollment.id)
}

const ticketsService = {
    getUserTickets,
    getTicketTypes,
    postTicket
    
};
  
export default ticketsService;