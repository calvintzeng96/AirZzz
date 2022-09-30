const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const { User } = require("../db/models");
const { secret, expiresIn } = jwtConfig;



// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token.
    const token = jwt.sign(
        { data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie("token", token, {
        maxAge: expiresIn * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });

    return token;
};



const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.scope("currentUser").findByPk(id);
        } catch (e) {
            res.clearCookie("token");
            return next();
        }

        if (!req.user) res.clearCookie("token");

        return next();
    });
};



// If there is no current user, return an error
// const requireAuth = function (req, _res, next) {
//     if (req.user) return next();

//     const err = new Error("Unauthorized");
//     err.title = "Unauthorized";
//     err.errors = ["Unauthorized"];
//     err.status = 401;
//     return next(err);
// }

//User Check
const checkUser = (req, res, next) => {
    if (req.user) {
        return next()
    }
    res.status(401)
    res.json({
        statusCode: 401,
        message: "Not Authorized"
    })
}

//checks to see if currentUser.id matches the instances' userId
const notAuthorized = function(userId, instanceId, res) {
    if (userId !== instanceId) {
        res.status(403)
        return res.json({
            status: 403,
            message: "User Not Authorized"
        })
    }
    return
}

module.exports = { setTokenCookie, restoreUser, checkUser, notAuthorized };
