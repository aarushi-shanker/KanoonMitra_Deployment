// routes/logBotRoutes.js
import express from "express";
import Log from "../models/logModel.js";
import logEvent from "../utils/logEvents.js";
const router = express.Router();

// Bot session logging route
router.post("/bot-session", async (req, res) => {
  try {
    const { userId, message, metadata } = req.body;

    await logEvent("INFO","ASSISTANT", {
      userId: userId || "Unregistered User",
      message: message || "Opened Assistant",
      metadata: metadata || {},
    });
    
    res.status(201).json({ success: true, message: "Bot session logged" });
  } catch (error) {
    await logEvent("ERROR", "ASSISTANT", {
      message: `Logging failed. Error : ${error.message}`,
    });
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;