const axios = require("axios");
const Product = require("../models/product");

// Conversation Memory
let conversationHistory = [
  {
    role: "system",
    content:
      "You are JewelAI Assistant. Help customers choose jewellery, answer questions about jewellery, shipping, returns, and recommend products professionally. If products are provided to you, recommend only from those products.",
  },
];

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Message is required",
      });
    }

    const userMessage = message.toLowerCase();

    // -------------------------
    // Extract Budget
    // -------------------------
    let maxPrice = null;

    const priceMatch = userMessage.match(/(\d+)\s*k/i);

    if (priceMatch) {
      maxPrice = parseInt(priceMatch[1]) * 1000;
    } else {
      const normalPrice = userMessage.match(/\d+/);

      if (normalPrice) {
        maxPrice = parseInt(normalPrice[0]);
      }
    }

    // -------------------------
    // Extract Product Keyword
    // -------------------------
    let keyword = "";

   const keywords = [
  "watch",
  "ring",
  "necklace",
  "bracelet",
  "earring",
  "chain",
  "pendant",
  "bangle",
  "anklet",
  "diamond",
  "gold",
  "silver",
  "platinum",
];

    for (const item of keywords) {
      if (userMessage.includes(item)) {
        keyword = item;
        break;
      }
    }

    // -------------------------
    // MongoDB Search
    // -------------------------
   const query = {};

if (keyword) {
  query.$or = [
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
    {
      description: {
        $regex: keyword,
        $options: "i",
      },
    },
    {
      material: {
        $regex: keyword,
        $options: "i",
      },
    },
    {
      brand: {
        $regex: keyword,
        $options: "i",
      },
    },
  ];
}

if (maxPrice) {
  query.price = {
    $lte: maxPrice,
  };
}

    const products = await Product.find(query)
  .sort({
    featured: -1,
    bestseller: -1,
    rating: -1,
    price: 1,
  })
  .limit(4);

       console.log("Query:", query);
        console.log("All Products:", products);

    console.log("========== AI Search ==========");
    console.log("User:", message);
    console.log("Keyword:", keyword);
    console.log("Budget:", maxPrice);
    console.log("Products Found:", products.length);

    // -------------------------
    // Product Context
    // -------------------------
    let productContext = "No matching products found.";

    if (products.length > 0) {
      productContext = products
        .map(
          (p) =>
            `Name: ${p.name}, Category: ${p.category}, Price: ₹${p.price}, Description: ${p.description}`
        )
        .join("\n");
    }

    // -------------------------
    // Conversation
    // -------------------------
    conversationHistory.push({
      role: "user",
      content: message,
    });

    if (conversationHistory.length > 20) {
      conversationHistory.splice(1, 2);
    }

    // -------------------------
    // OpenRouter
    // -------------------------
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "nvidia/nemotron-3-ultra-550b-a55b:free",
        messages: [
          ...conversationHistory,
          {
            role: "system",
           content: `You are JewelAI Shopping Assistant.

Matching Products:

${productContext}

Rules:

1. Recommend ONLY from the matching products.
2. If products exist, explain why they match the user's request.
3. Mention the budget if one was given.
4. Be friendly and professional.
5. Never invent products that are not listed.
6. If there are no products, politely ask the user to try another category or budget.`,
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

    const aiReply = response.data.choices[0].message.content;

    conversationHistory.push({
      role: "assistant",
      content: aiReply,
    });

    console.log("AI:", aiReply);

    res.json({
      success: true,
      reply: aiReply,
      products: products,
    });
  } catch (error) {
    console.error(
      "OpenRouter Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      error: "AI Server Error",
    });
  }
};

module.exports = { chatWithAI };