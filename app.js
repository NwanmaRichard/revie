const express = require("express");
const app = express();
const AppError = require("./utils/appError");
const Review = require("./models/reviewModel");
const reviewRouter = require("./routes/reviewRoutes")
const userRouter = require("./routes/userRoutes")
const globalErrorHandler = require("./controllers/errorController");


app.use(express.json());
app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
});


//ROUTES
app.use("/api/v1/users", userRouter);

app.use("/api/v1/reviews", reviewRouter);

//ERROR HANDLING
app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server`)
  // err.status = "fail"
  // err.statusCode = 404

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
});

 app.use(globalErrorHandler)

module.exports = app




