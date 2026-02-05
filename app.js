const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
// Middlewares
app.use(morgan("dev"));
app.use(express.json()); //middleware. auto parse to json

// access static file system:
app.use(express.static(`${__dirname}/public`));
//creating and adding a function to the middleware stack:
app.use((req, res, next) => {
  console.log("Hello from middleware 🙋🏽‍♂️");
  next();
});

app.use((req, res, next) => {
  req.requestedTime = new Date().toISOString();
  next();
});

/*************************** ROUTES ***************************/

//insteadof using app. we 'll now use tourRouter.
// express.Router() returns a function
// to connect it with our application we will use it as middleware:
// app.use('route', tourRouter), where route  = /api/v1/tours
// tourRouter is the middlesware and we want to use that mw for this route

//mounting the routers
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app; // to server.js
