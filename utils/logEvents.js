import Log from "../models/logModel.js";

const logEvent = async (eventType, details = {}) => {
  try {
    await Log.create({ eventType, details });
  } catch (err) {
    console.error("Event logging failed:", err.message);
  }
};

export default logEvent;