const express = require("express");
const router = express.Router();

const Review = require("../models/review");

router.post("/add", async (req, res) => {

  try {

    const review = new Review(req.body);

    await review.save();

    res.json({
      message: "Review Added",
    });

  } catch (error) {

    res.status(500).json(error);

  }

});

router.get("/:productId", async (req, res) => {

  try {

    const reviews = await Review.find({
      productId: req.params.productId,
    });

    res.json(reviews);

  } catch (error) {

    res.status(500).json(error);

  }

});

module.exports = router;