const express = require("express");
const router = express.Router();

const Order = require("../models/order");router.post("/add", async (req, res) => {

  try {

    const order = new Order(req.body);

    await order.save();

    res.json({
      message: "Order Saved",
    });

  } catch (error) {

    res.status(500).json(error);

  }

});router.get("/:email", async (req, res) => {

try {


console.log("Email Received:", req.params.email);

const orders = await Order.find({
  userEmail: req.params.email,
});

console.log("Orders Found:", orders);

res.json(orders);


} catch (error) {

res.status(500).json(error);


}

});


module.exports = router;