import multer from "multer";
import lawyerModel from "../models/lawyerModel.js";
import userModel from "../models/userModel.js";
import appointmentModel from "../models/appointmentModel.js";
import path from "path";
import __dirname from "../utils/getDirname.js";
import logEvent from "../utils/logEvents.js";

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const applyLawyerController = async (req, res) => {
  try {
    const profilePhoto = req.file ? req.file.filename : null;
    const { start, end, userId, ...rest } = req.body;
    const newLawyer = new lawyerModel({
      ...rest,
      userId,
      timings: { start, end },
      profilePhoto,
      status: "pending",
    });
    await newLawyer.save();

    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification || [];
    notification.push({
      type: "apply-lawyer-account",
      message: `${newLawyer.firstName} ${newLawyer.lastName} has applied for a lawyer account`,
      data: {
        lawyerId: newLawyer._id,
        name: newLawyer.firstName + " " + newLawyer.lastName,
      },
      onClickPath: "/lawyerList",
    });

    await userModel.findByIdAndUpdate(adminUser._id, { notification });

    res.status(201).send({
      success: true,
      message: "Request for Lawyer Account successful.",
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, error, message: "Failed to register lawyer." });
  }
};

const getLawyerInfoController = async (req, res) => {
  try {
    const lawyer = await lawyerModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "lawyer data fetch success",
      data: lawyer,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, error, message: "Failed to fetch lawyer data." });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const profilePhoto = req.file ? req.file.filename : undefined;
    const { start, end, userId, ...rest } = req.body;
    const updateData = {
      ...rest,
      timings: { start, end },
    };
    if (profilePhoto) {
      updateData.profilePhoto = profilePhoto;
    }

    const updatedLawyer = await lawyerModel.findOneAndUpdate(
      { userId: userId },
      updateData,
      { new: true }
    );

    if (!updatedLawyer) {
      return res.status(404).send({
        success: false,
        message: "Lawyer not found.",
      });
    }

    res.status(200).send({
      success: true,
      message: "Lawyer profile updated successfully.",
      data: updatedLawyer,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Failed to update lawyer.",
    });
  }
};

const getLawyerByIdController = async (req, res) => {
  try {
    const lawyer = await lawyerModel.findOne({ _id: req.body.lawyerId });
    res.status(200).send({
      success: true,
      message: "lawyer data fetch success",
      data: lawyer,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, error, message: "Failed to fetch lawyer data." });
  }
};

const lawyerAppointmentsController = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const lawyer = await lawyerModel.findOne({ userId: req.body.userId });

    const totalAppointments = await appointmentModel.countDocuments({
      lawyerId: lawyer._id,
    });

    const appointments = await appointmentModel
      .find({ lawyerId: lawyer._id })
      .sort({ date: -1 }) 
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).send({
      message: "Appointments Fetched Successfully",
      success: true,
      data: appointments,
      totalPages: Math.ceil(totalAppointments / limit),
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in fetching appointments",
      error,
    });
  }
};

const updateStatusController = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointment.userId });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    user.notification.push({
      type: "lawyer-appointment-request-updated",
      message: `Your Lawyer Appointment Request has been ${status}`,
      onClickPath: "/Appointments-Page",
    });

    await user.save();

    await logEvent("APPOINTMENT", {
        message: `Status updated to ${status} for appointment booking with id ${appointmentId}`,
        metadata: {
          appointmentId,
          time: new Date(),
        },
    });
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in status change",
      error,
    });
  }
};

export {
  applyLawyerController,
  upload,
  getLawyerInfoController,
  updateProfileController,
  getLawyerByIdController,
  lawyerAppointmentsController,
  updateStatusController,
};
