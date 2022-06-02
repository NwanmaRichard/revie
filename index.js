const express = require("express");
const app = express();
const Review = require("./reviewModel");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
app.use(express.json());

//CONNECTING OUR APPLICATION to MONGODB ATLAS
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log("Database not connected", err);
  });

app.get("/api/v1/reviews", (req, res) => {
  res.status(200).json({
    status: "Success",
  });
});

app.post("", (req, res) => {});

app.post("", (req, res) => {});

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
