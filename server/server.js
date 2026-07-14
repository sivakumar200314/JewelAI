const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

/* ==========================
   MIDDLEWARE
========================== */

app.use(cors());
app.use(express.json());

/* Serve Uploaded Images */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ==========================
   ROUTES
========================== */

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/ai", aiRoutes);

/* ==========================
   HOME
========================== */

app.get("/", (req, res) => {
  res.send("🚀 JewelAI Server Running");
});

/* ==========================
   DATABASE
========================== */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(5000, () => {
      console.log("🚀 Server Running on Port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });