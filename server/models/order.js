const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
  userEmail: String,
  productName: String,
  price: Number,
  quantity: Number,
  status: {
    type: String,
    default: "Ordered",
  },
},
{
  timestamps: true,
}
);

module.exports = mongoose.model("Order", orderSchema);