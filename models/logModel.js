// models/logModel.js

import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  eventType: { type: String, enum: ['LOGIN', 'REGISTER', 'APPOINTMENT', 'BOT', 'DOCUMENT GENERATION'], required: true },
  details: { type: Object },
  timestamp: { type: Date, default: Date.now }
});

const Log = mongoose.model("logs", logSchema);
export default Log;