import { body } from "express-validator";

export const createProductValidator = [
  body("title").notEmpty().withMessage("Title is required"),

  body("description").notEmpty(),

  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be >= 0"),
];