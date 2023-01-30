import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function create(data: Prisma.SessionUncheckedCreateInput) {
  return prisma.session.create({
    data,
  });
}

async function findUserIdByToken(token: string) {
  const user = await prisma.session.findFirst({
    where:{
      token
    }
  }) 

  return user.userId
}

const sessionRepository = {
  create,
  findUserIdByToken
};

export default sessionRepository;
