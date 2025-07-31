// cron/weeklyReport.js

import cron from "node-cron";
import Log from "../models/logModel.js";
import userModel from "../models/userModel.js";
import Appointment from "../models/appointmentModel.js";
import { sendEmail } from "../utils/emailService.js";

// Run every Monday at 8 AM
cron.schedule("0 8 * * 1", async () => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // 1. New Users
    const newUsers = await userModel.countDocuments({ createdAt: { $gte: oneWeekAgo } });

    // 2. New Appointments
    const newAppointments = await Appointment.countDocuments({ createdAt: { $gte: oneWeekAgo } });

    // 3. Bot Sessions
    const botLogs = await Log.countDocuments({
      type: "BOT",
      timestamp: { $gte: oneWeekAgo },
    });

    const docLogs = await Log.countDocuments({
      type: "DOCUMENT GENERATION",
      timestamp: { $gte: oneWeekAgo },
    });

    // 4. (Optional) Top Lawyers by appointment count
    const topLawyers = await Appointment.aggregate([
      { $match: { createdAt: { $gte: oneWeekAgo } } },
      { $group: { _id: "$lawyerId", total: { $sum: 1 } } },
      { $sort: { total: -1 } },
      { $limit: 3 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "lawyer",
        },
      },
      {
        $project: {
          _id: 0,
          name: { $arrayElemAt: ["$lawyer.username", 0] },
          appointments: "$total",
        },
      },
    ]);

    const reportHtml = `
      <h2>📊 Kanoon Mitra Weekly Report</h2>
      <p><strong>New Users:</strong> ${newUsers}</p>
      <p><strong>Appointments Booked:</strong> ${newAppointments}</p>
      <p><strong>Bot Sessions:</strong> ${botLogs}</p>
      <p><strong>Documents generated:</strong> ${docLogs}</p>
      <h3>👨‍⚖️ Top Lawyers This Week:</h3>
      <ul>
        ${topLawyers.map(lawyer => `<li>${lawyer.name}: ${lawyer.appointments} appointments</li>`).join("")}
      </ul>
    `;

    await sendEmail({
      to: process.env.EMAIL_RECEIVER, // multiple recipients comma-separated
      subject: "Kanoon Mitra | Weekly Activity Report",
      html: reportHtml,
    });

    console.log("Weekly report sent successfully!");

  } catch (error) {
    console.error("Error generating weekly report:", error);
  }
});