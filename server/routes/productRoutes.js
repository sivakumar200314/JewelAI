const express = require("express");
const router = express.Router();

const Product = require("../models/product");
const upload = require("../middleware/upload");
const {
  getSimilarProducts,
} = require("../controllers/similarProductController");
router.get(
  "/similar/:id",
  getSimilarProducts
);  

// ======================
// GET ALL PRODUCTS
// ======================

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================
// ADD PRODUCT
// ======================

router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,

      // Save uploaded filename
      image: req.file.filename,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product Added Successfully",
      product: newProduct,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================
// UPDATE PRODUCT
// ======================

router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json({
      message: "Product Updated",
      product: updatedProduct,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================
// DELETE PRODUCT
// ======================

router.delete("/:id", async (req, res) => {
  try {

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product Deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;