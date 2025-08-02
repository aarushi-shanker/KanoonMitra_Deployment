import Log from "../models/logModel.js";

const logEvent = async (logType, eventType, details = {}) => {
  try {
    await Log.create({ logType, eventType, details });
  } catch (err) {
    await logEvent("ERROR", "LOG", {
      message: `Event logging failed. Error : ${err.message}`,
    });
  }
};

export default logEvent;