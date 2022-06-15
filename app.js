const express = require("express");
const app = express();
const Review = require("./models/reviewModel");
const reviewRouter = require("./routes/reviewRoutes")
const userRouter = require("./routes/userRoutes")

app.use(express.json());
app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
});





//ROUTES
app.use("/api/v1/users", userRouter);

app.use("/api/v1/reviews", reviewRouter);

module.exports = app




