const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    subCategory: {
      type: String,
    },

    brand: {
      type: String,
      default: "JewelAI",
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    originalPrice: {
      type: Number,
    },

    discount: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      default: 20,
    },

    image: {
      type: String,
      required: true,
    },

    images: [
      {
        type: String,
      },
    ],

    weight: {
      type: String,
    },

    purity: {
      type: String,
    },

    material: {
      type: String,
    },

    gender: {
      type: String,
      default: "Women",
    },

    occasion: {
      type: String,
    },

    rating: {
      type: Number,
      default: 4.5,
    },

    reviews: {
      type: Number,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    newArrival: {
      type: Boolean,
      default: false,
    },

    bestseller: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema);