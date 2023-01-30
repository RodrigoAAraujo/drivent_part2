import { prisma } from "@/config";
import { notFoundError } from "@/errors";
import { Enrollment, User } from "@prisma/client";
import { Session } from "inspector";

async function findWithAddressByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Address: true,
    },
  });
}

async function upsert(
  userId: number,
  createdEnrollment: CreateEnrollmentParams,
  updatedEnrollment: UpdateEnrollmentParams,
) {
  return prisma.enrollment.upsert({
    where: {
      userId,
    },
    create: createdEnrollment,
    update: updatedEnrollment,
  });
}

async function findEnrollmentByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where:{
      userId: userId - 1
    }
  });
}

export type CreateEnrollmentParams = Omit<Enrollment, "id" | "createdAt" | "updatedAt">;
export type UpdateEnrollmentParams = Omit<CreateEnrollmentParams, "userId">;

const enrollmentRepository = {
  findWithAddressByUserId,
  upsert,
  findEnrollmentByUserId
};

export default enrollmentRepository;
