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

app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
});

app.post("/api/v1/review", async (req, res) => {
  try {
    const newReview = await Review.create(req.body);

    return res.status(201).json({
      status: "Success",
      data: {
        review: newReview,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err,
    }); 
  }
});

app.get("/api/v1/reviews", async (req, res) => {
  try {
    let query = Review.find();

    if (req.query.sort) {
      query = query.sort(req.query.sort);
    }

    const reviews = await query;

    res.status(200).json({
      status: "Success",
      results: reviews.length,
      data: {
        reviews,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err,
    });
  }
});

app.get("/api/v1/review/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      data: {
        review,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err,
    });
  }
});

app.patch("/api/v1/review/:id", async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "Success",
      data: {
        review,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err,
    });
  }
});

app.get("/api/v1/review/:id/helpful", async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "Success",
      helpful: counter,
    });
    
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err,
    });
  }
});

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
