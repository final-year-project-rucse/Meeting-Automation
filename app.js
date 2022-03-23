const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyparser = require("body-parser");

const authRouter = require("./router/user");
const headRouter = require("./router/head");
const committeesRouter = require("./router/committes");
const membersRouter = require("./router/members");
const minutesRouter = require("./router/meeting");
const teachersRouter = require("./router/teachers");

const globalErrorHandler = require("./controller/errorController");
const appError = require("./utils/appError");
const email = require("./utils/email");

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use("/api/v1/user", authRouter);
app.use("/api/v1/head", headRouter);
app.use("/api", committeesRouter);
app.use("/api",membersRouter);
app.use("/api",minutesRouter);
app.use("/api",teachersRouter);

app.all(`*`, (req, res, next) => {
    next(new appError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;