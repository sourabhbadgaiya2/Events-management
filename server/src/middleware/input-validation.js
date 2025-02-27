import { validationResult, check } from "express-validator";

export const userRegisterValidation = [
  check("name", "Name is required").notEmpty(),

  check("email")
    .isEmail()
    .withMessage("Email is required")
    .isLength({ min: 4, max: 32 })
    .withMessage("Email must be between 3 to 32 characters"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
  },
];

export const userLoginValidation = [
  check("email")
    .isEmail()
    .withMessage("Email is required")
    .isLength({ min: 4, max: 32 })
    .withMessage("Email must be between 3 to 32 characters"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
  },
];
