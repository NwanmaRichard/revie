const mongoose = require("mongoose")
const Review = require("../models/reviewModel")

exports. createReview = async (req, res) => {
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
};

exports. getAllReview = async (req, res) => {
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
};

exports. getReview = async (req, res) => {
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
};

exports. updateReview = async (req, res) => {
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
};

exports. deleteReview = async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);

  if (!review) {
    return res.status(500).json({
      status: "Fail",
      Message: "No tour with that ID",
    });
  }

  res.status(201).json({
    status: "success",
    data: null,
  });
};
