import { TicketPostType } from "@/protocols";

import Joi from "joi";

export const ticketPostSchema = Joi.object<TicketPostType>({
    ticketTypeId: Joi.number().required()
});