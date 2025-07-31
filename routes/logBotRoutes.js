// routes/logBotRoutes.js
import express from "express";
import Log from "../models/logModel.js";
import logEvent from "../utils/logEvents.js";
const router = express.Router();

// Bot session logging route
router.post("/bot-session", async (req, res) => {
  try {
    const { usermail, message, metadata } = req.body;

    await logEvent("BOT", {
      usermail: usermail || "Anonymous",
      message: message || "Opened Assistant",
      metadata: metadata || {},      time: new Date(),
    });
    
    res.status(201).json({ success: true, message: "Bot session logged" });
  } catch (error) {
    console.error("Logging failed:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;