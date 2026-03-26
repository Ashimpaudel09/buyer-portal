import Joi from "joi";

export const addFavouriteSchema = Joi.object({
  propertyId: Joi.number().required(),
});
