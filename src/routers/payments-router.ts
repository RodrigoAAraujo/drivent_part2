import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { paymentPostSchema } from "@/schemas/payments-schema";
import { getPayment, postPayment } from "@/controllers/payments.controller";

const paymentsRouters = Router();

paymentsRouters
    .all("/*", authenticateToken)
    .get("/", getPayment)
    .post("/process", validateBody(paymentPostSchema), postPayment)

export { paymentsRouters };