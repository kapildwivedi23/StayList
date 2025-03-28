const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync");
const { validatereview, isLoggedin, isReviewAuthor } = require("../middleware");
const reviewController = require("../controller/reviews.js")


router.post("/", isLoggedin, validatereview, wrapAsync(reviewController.createReview))
router.delete("/:reviewId", isLoggedin, isReviewAuthor, wrapAsync(reviewController.destroyReview));
module.exports = router;