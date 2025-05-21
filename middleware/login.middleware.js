import { body, validationResult } from "express-validator";

export default async function checkValidation(data) {
  const req = { body: data };

  const validations = [
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ];
  await Promise.all(validations.map((validation) => validation.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errors.array();
  }

  return null;
}
