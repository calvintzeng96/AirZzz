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
    .custom(val => val > 1)
    .withMessage("Price can not be less than $1"),
  handleValidationErrors
];

const checkReviewStar = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .custom(val => val <= 5 && val >= 1)
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors
]

const checkEndBeforeStart = [
  check("endDate")
    .exists({ checkFalsy: true })
    .custom((val, { req }) => new Date(val) > new Date(req.body.startDate))
    .withMessage("endDate cannot be on or before startDate"),
  handleValidationErrors
]

const checkQuery = [
  check("page")
    .custom((val) => !val || parseInt(val) > 0 ? true : false )
    .withMessage("Page must be greater than or equal to 1"),
  check("size")
    .custom((val) => !val || parseInt(val) > 0 ? true : false )
    .withMessage("Size must be greater than or equal to 1"),
  check("maxLat")
    .custom((val) => !val || parseInt(val) || parseInt(val) == 0 ? true : false )
    .withMessage("Maximum latitude is invalid"),
  check("minLat")
    .custom((val) => !val || parseInt(val) || parseInt(val) == 0 ? true : false )
    .withMessage("Maximum latitude is invalid"),
  check("minLng")
    .custom((val) => !val || parseInt(val) || parseInt(val) == 0 ? true : false )
    .withMessage("Minimum longitude is invalid"),
  check("maxLng")
    .custom((val) => !val || parseInt(val) || parseInt(val) == 0 ? true : false )
    .withMessage("Maximum longitude is invalid"),
  check("minPrice")
    .custom((val) => !val || parseInt(val) >= 0 ? true : false )
    .withMessage("Minimum price must be greater than or equal to 0"),
  check("maxPrice")
    .custom((val) => !val || parseInt(val) >= 0 ? true : false )
    .withMessage("Maximum price must be greater than or equal to 0"),
  handleValidationErrors,
];


module.exports = {
  handleValidationErrors,
  validateCreateSpot,
  checkReviewStar,
  checkEndBeforeStart,
  checkQuery
};
