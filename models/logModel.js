// models/logModel.js

import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  eventType: {
    type: String,
    enum: ['LOGIN', 'REGISTER', 'APPOINTMENT', 'ASSISTANT', 'DOCUMENT GENERATION'],
    required: true,
    index: true, 
  },
  details: { type: Object },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true, 
  },
});

// compound index
logSchema.index({ eventType: 1, timestamp: -1 });

const Log = mongoose.model("logs", logSchema);
export default Log;