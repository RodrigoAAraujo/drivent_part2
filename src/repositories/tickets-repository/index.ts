import { prisma } from "@/config";
import { unauthorizedError } from "@/errors";

async function getUserTickets(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId
    },
    include: {
      TicketType: true
    }
  })
}

async function getTicketTypes() {
  return prisma.ticketType.findMany()
}

async function registerTicket(ticketTypeId: number, enrollmentId: number) {
  return prisma.ticket.create({
    data: {
      ticketTypeId,
      status: "RESERVED",
      enrollmentId
    },
    include: {
      TicketType: true
    }
  })
}

async function checkTicketIdExistence(ticketId: number) {
  return await prisma.ticket.findUnique({
    where: { id: ticketId }
  })
}

async function changePaidStatus(ticketId: number) {
  await prisma.ticket.update({
    where: {
      id: ticketId
    },
    data: {
      status: "PAID"
    }
  })
}

async function checkTicketOwner(ticketId: number, token: string) {

  const ticketOwner = await prisma.ticket.findFirst({
    where: {
      id: ticketId
    },
    include: {
      Enrollment: true
    }
  })

  const sessionOwner = await prisma.session.findFirst({
    where: {
      token,
    },
    select: {
      userId: true
    }
  });

  if (sessionOwner.userId !== ticketOwner.Enrollment.userId + 1) {
    throw unauthorizedError()
  }
}


const ticketRepository = {
  getUserTickets,
  getTicketTypes,
  registerTicket,
  checkTicketIdExistence,
  changePaidStatus,
  checkTicketOwner
};

export default ticketRepository;