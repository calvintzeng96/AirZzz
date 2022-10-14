const express = require("express")
const { User } = require("../../db/models");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateLogin = [
    check("credential")
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Please provide a valid email or username."),
    check("password")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a password."),
    handleValidationErrors
];


// Log in
router.post("/", validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;
    const user = await User.scope("currentUser").login({ credential, password });

    if (!user) {
        const err = new Error();
        err.message = "Invalid credentials"
        err.status = 401;
        res.status(401)
        res.json(err)
    }

    setTokenCookie(res, user);
    user.dataValues.token = setTokenCookie(res, user)

    return res.json(user);
});

//logs out, removes token cookie from res & return msg
router.delete("/", (_req, res) => {
    res.clearCookie("token");

    return res.json({ message: "success" });
});

router.get("/", restoreUser, (req, res) => {
    const { user } = req;

    if (user) {
        return res.json(user.toSafeObject());
    } else {
        return res.json(null);
    }
});


module.exports = router;
