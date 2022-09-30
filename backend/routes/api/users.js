const express = require("express")
const { User } = require("../../db/models");
const { setTokenCookie } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();


const validateSignup = [
    check("email")
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage("Please provide a valid email."),
    check("username")
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage("Please provide a username with at least 4 characters."),
    check("username")
        .not()
        .isEmail()
        .withMessage("Username cannot be an email."),
    check("password")
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage("Password must be 6 characters or more."),
    handleValidationErrors
];

router.post("/", validateSignup, async (req, res) => {
    const { firstName, lastName, email, password, username, imageUrl } = req.body;
    const user = await User.signup({ firstName, lastName, email, username, password, imageUrl });

    setTokenCookie(res, user);
    user.dataValues.token = setTokenCookie(res, user)

    return res.json(user);
});

router.post("/", async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
        user
    });
});


module.exports = router;
