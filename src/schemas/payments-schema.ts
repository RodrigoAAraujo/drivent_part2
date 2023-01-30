import { PaymentPostType } from "@/protocols";

import Joi from "joi";

export const paymentPostSchema = Joi.object<PaymentPostType>({
    ticketId: Joi.number().required(),
	cardData: {
		issuer: Joi.string().required(),
        number: Joi.number().required(),
        name: Joi.string().required(),
        expirationDate: Joi.string().required(),
        cvv: Joi.number().required()
	}
});