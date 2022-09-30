const { validationResult } = require("express-validator");
const { check } = require("express-validator");



//middleware to format errors
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);
    const err = Error();
    delete (validationErrors.title)
    err.message = "Validation Error"
    err.errors = errors;
    err.status = 400;
    next(err);
  }
  next();
};

const validateCreateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city")
    .exists({ checkFalsy: true })
    .withMessage("City is required"),
  check("state")
    .exists({ checkFalsy: true })
    .withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .custom(val => val < 90 && val > -90)
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .custom(val => val < 180 && val > -180)
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors
];





module.exports = {
  handleValidationErrors,
  validateCreateSpot
};
