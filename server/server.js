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

    const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server Running on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
  })
  .catch((err) => {
    console.log(err);
  });