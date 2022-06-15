const mongoose = require("mongoose");
const express = require("express")
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");



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

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});


