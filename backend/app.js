const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { ValidationError } = require("sequelize")
const { UniqueConstraintError } = require("sequelize")


const { environment } = require("./config");
const isProduction = environment === "production";

const app = express();

app.use(morgan("dev"))

app.use(cookieParser());
app.use(express.json());

const routes = require("./routes");

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}
// helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);
// Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
    );

app.use(routes);


//catches any unfiltered requests and sends you to error handler.
app.use((_req, _res, next) => {
    const err = new Error("The request resouce couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The request resource couldn't be found."];
    err.status = 404;
    next(err);
})



//takes in next(err) from above and processes sequelize errors
app.use((err, _req, _res, next) => {
    if (err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message);
        err.title = "Validation error";
    }
    next(err);
});

// //SequelizeUniqueConstraintError
app.use((err, _req, _res, next) => {
    if (err instanceof UniqueConstraintError) {
        err.title = "Unique Validation Failed"
        err.message = ["User with that email already exists"]
        err.status = 403
    }
    next(err)
});

//Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        statusCode: err.status,
        errors: err.errors,
        // stack: isProduction ? null : err.stack
    });
});



module.exports = app;
