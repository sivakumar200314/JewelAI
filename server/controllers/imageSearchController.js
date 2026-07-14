const axios = require("axios");
const fs = require("fs");
const Product = require("../models/product");

const imageSearch = async (req, res) => {
  try {
    console.log("========== IMAGE SEARCH ==========");

    // Check image
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    console.log("Uploaded File:", req.file);

    // Read image
    const imageBuffer = fs.readFileSync(req.file.path);
    const base64Image = imageBuffer.toString("base64");

    // Send image to OpenRouter Vision
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "qwen/qwen2.5-vl-72b-instruct",
        max_tokens: 20,
        temperature: 0,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Reply with ONLY ONE WORD from this list: ring, necklace, bracelet, watch, earring, pendant, chain, bangle, anklet.",
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:${req.file.mimetype};base64,${base64Image}`,
                },
              },
            ],
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "JewelAI",
        },
      }
    );

    // Detect keyword
    const keyword = response.data.choices[0].message.content
      .trim()
      .toLowerCase();

    console.log("Detected Jewellery:", keyword);

    // Search matching products
    const products = await Product.find({
      $or: [
        {
          name: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          category: {
            $regex: keyword,
            $options: "i",
          },
        },
      ],
    });

    console.log("Products Found:", products.length);

    // Delete uploaded image
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log("Unable to delete uploaded image:", err.message);
      }
    });

    // Send response
    return res.json({
      success: true,
      message: `I detected a ${keyword} and found ${products.length} matching product(s).`,
      keyword,
      products,
    });
  } catch (error) {
    console.error(
      "Image Search Error:",
      error.response?.data || error.message
    );

    // Delete image if something failed
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }

    return res.status(500).json({
      success: false,
      message: "Image Search Failed",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = {
  imageSearch,
};