import { prisma } from "@/config";
import { unauthorizedError } from "@/errors";
import { PaymentPostType } from "@/protocols";

async function getPaymentInfo(ticketId: number) {
    return prisma.payment.findFirst({
        where:{
            ticketId
        },
    })
}


async function registerPayment(payment: PaymentPostType){
    const value  = await prisma.ticket.findFirst({
        where:{
            id: payment.ticketId
        },
        include:{
            TicketType:{
                select:{
                    price: true
                }
            }
        }
    })
    const cardLastDigits = String(payment.cardData.number).substring(11)

    const paid = await prisma.payment.create({
        data:{
            ticketId: payment.ticketId,
            value: value.TicketType.price,
            cardIssuer: payment.cardData.issuer, 
            cardLastDigits: cardLastDigits,
        }
    })
    return(paid)
}

const paymentRepository = {
    getPaymentInfo,
    registerPayment
};

export default paymentRepository;