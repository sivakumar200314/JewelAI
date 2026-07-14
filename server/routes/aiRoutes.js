const express = require("express");
const multer = require("multer");

const { chatWithAI } = require("../controllers/aiController");
const { imageSearch } = require("../controllers/imageSearchController");
const { getRecommendations } = require("../controllers/recommendationController");

const router = express.Router();

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// =========================
// AI CHAT
// =========================
router.post("/chat", chatWithAI);

// =========================
// AI IMAGE SEARCH
// =========================
router.post(
  "/image-search",
  upload.single("image"),
  imageSearch
);

// =========================
// AI RECOMMENDATIONS
// =========================
router.post("/recommend", getRecommendations);

module.exports = router;