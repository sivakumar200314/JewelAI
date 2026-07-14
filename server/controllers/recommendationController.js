const Product = require("../models/product");

const getRecommendations = async (req, res) => {
  try {
    const { category, price } = req.body;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    // Search Query
    const query = {
      $or: [
        {
          category: {
            $regex: category,
            $options: "i",
          },
        },
        {
          name: {
            $regex: category,
            $options: "i",
          },
        },
        {
          description: {
            $regex: category,
            $options: "i",
          },
        },
        {
          material: {
            $regex: category,
            $options: "i",
          },
        },
      ],
    };

    // Budget Filter
    if (price) {
      query.price = {
        $lte: Number(price),
      };
    }

    console.log("Recommendation Query:", query);

    // Get Products
    const products = await Product.find(query)
      .sort({
        featured: -1,
        bestseller: -1,
        rating: -1,
        price: 1,
      })
      .limit(4);

    console.log("Products Found:", products.length);

    return res.json({
      success: true,
      total: products.length,
      products,
    });

  } catch (error) {
    console.error("Recommendation Error:", error);

    return res.status(500).json({
      success: false,
      message: "Recommendation Error",
    });
  }
};

module.exports = {
  getRecommendations,
};