const express = require("express");
const reviewController = require("./../controllers/reviewController");
const router = express.Router();

router
  .route("/")
  .post(reviewController.createReview)
  .get(reviewController.getAllReview);

router
  .route("/:id")
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
