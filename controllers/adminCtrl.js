import userModel from "../models/userModel.js";
import lawyerModel from "../models/lawyerModel.js";
import Log from "../models/logModel.js";
import appointmentModel from "../models/appointmentModel.js";

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "users data",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while fetching users",
      error,
    });
  }
};

const getAllLawyersController = async (req, res) => {
  try {
    const lawyers = await lawyerModel.find({});
    res.status(200).send({
      success: true,
      message: "lawyers data",
      data: lawyers,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while fetching lawyers",
      error,
    });
  }
};

const changeStatusController = async (req, res) => {
  try {
    const { lawyerId, status } = req.body;
    const lawyer = await lawyerModel.findByIdAndUpdate(lawyerId, { status });
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    user.notification.push({
      type: "lawyer-account-request-updated",
      message: `Your Lawyer Account ${
        status === "removed" ? "" : "Request"
      } has been ${status}`,
    });

    if (status === "approved" && user) {
      user.isLawyer = true;
    } else user.isLawyer = false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: lawyer,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in status change",
      error,
    });
  }
};

const toggleBlockController = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.status(200).json({
      success: true,
      message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully`,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Server Error", error });
  }
};

const statsController = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();
    const totalLawyers = await userModel.countDocuments({ isLawyer: true });
    const totalAppointments = await appointmentModel.countDocuments();
    const totalBotSessions = await Log.countDocuments({ type: "BOT" });
    const totalDocGenerated = await Log.countDocuments({
      type: "DOCUMENT GENERATION",
    });
    if (
      !totalUsers ||
      !totalLawyers ||
      !totalAppointments ||
      !totalBotSessions ||
      !totalDocGenerated
    ) {
      return res
        .status(404)
        .json({ success: false, message: "Requested items not found" });
    }
    res.send({
      totalUsers,
      totalLawyers,
      totalAppointments,
      totalBotSessions,
      totalDocGenerated,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const logsController = async (req, res) => {
  try {
    const { type, startDate, endDate } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate);
      if (endDate) filter.timestamp.$lte = new Date(endDate);
    }

    const logs = await Log.find(filter).sort({ timestamp: -1 }).limit(200);
    if (!logs) {
      return res
        .status(404)
        .json({ success: false, message: "Logs not found" });
    }
    res.send(logs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch logs" });
  }
};

const getWeeklyAnalyticsController = async (req, res) => {
  try {
    const today = new Date();
    const last6Weeks = [];

    for (let i = 0; i < 6; i++) {
      const end = new Date(today);
      end.setDate(end.getDate() - 7 * i);
      const start = new Date(end);
      start.setDate(start.getDate() - 6);

      const weekLabel = `${start.toLocaleDateString("en-GB", {
        month: "short",
        day: "numeric",
      })}–${end.toLocaleDateString("en-GB", { day: "numeric" })}`;

      const newUsers = await userModel.countDocuments({
        createdAt: { $gte: start, $lte: end },
      });

      const appointments = await appointmentModel.countDocuments({
        createdAt: { $gte: start, $lte: end },
      });
      const botSessions = await Log.countDocuments({
        eventType: "BOT",
        timestamp: { $gte: start, $lte: end },
      });
      const docGenerations = await Log.countDocuments({
        eventType: "DOCUMENT GENERATION",
        timestamp: { $gte: start, $lte: end },
      });
      if (!newUsers || !appointments || !botSessions || !docGenerations) {
        return res
          .status(404)
          .json({ success: false, message: "Requested items not found" });
      }
      last6Weeks.unshift({
        week: weekLabel,
        newUsers,
        appointments,
        botSessions,
        docGenerations,
      });
    }

    res.send({ weeklyStats: last6Weeks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch analytics." });
  }
};

export {
  getAllUsersController,
  getAllLawyersController,
  changeStatusController,
  toggleBlockController,
  statsController,
  logsController,
  getWeeklyAnalyticsController,
};
