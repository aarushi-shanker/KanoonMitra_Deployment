// models/logModel.js

import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  logType: {
    type: String,
    enum: ['INFO', 'ERROR'],
    required: true,
    index: true, 
  },
  eventType: {
    type: String,
    enum: ['DB', 'ADMIN', 'USER', 'AUTH', 'LAWYER', 'PAYMENT', 'LOGIN', 'REGISTER', 'APPOINTMENT', 'ASSISTANT', 'DOCUMENT GENERATION', 'REPORT', 'EMAIL', 'LOG'],
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