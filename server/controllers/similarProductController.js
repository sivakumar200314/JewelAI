const Product = require("../models/product");

const getSimilarProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const currentProduct = await Product.findById(id);

    if (!currentProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const similarProducts = await Product.find({
      _id: { $ne: id },
      category: currentProduct.category,
      price: {
        $gte: currentProduct.price * 0.7,
        $lte: currentProduct.price * 1.3,
      },
    })
      .sort({
        rating: -1,
      })
      .limit(4);

    res.json({
      success: true,
      products: similarProducts,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getSimilarProducts,
};