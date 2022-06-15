const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "There must be a name of the person giving the review"],
    trim: true,
  },
  videos: {
    type: [String],
  },
  images: {
    type: [String],
  },
  landlordReview: {
    type: String,
    required: [true, "There must be a landlord review"],
    trim: true,
  },
  environmentReview: {
    type: String,
    required: [true, "There must be an environment review"],
    trim: true,
  },
  qualityReview: {
    type: String,
    required: [true, "There must be a quality review"],
    trim: true,
  },
  createdAt:{
    type:Date,
    default: Date.now()
  },
  helpful:{
    type: Number,
    default:1
  }
});

const Review = mongoose.model("Reviews", reviewSchema)


module.exports = Review