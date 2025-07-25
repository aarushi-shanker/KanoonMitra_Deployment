import userModel from "../models/userModel.js";
import lawyerModel from "../models/lawyerModel.js";
import appointmentModel from "../models/appointmentModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Login Controller
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }
    if (user.isBlocked) {
      return res.status(403).send({ message: "User Blocked", success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .send({ message: "Invalid Email or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.error(`Error in Login: ${error.message}`);
    res.status(500).send({ success: false, message: "Server Error" });
  }
};

// Register Controller
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send({
        message: "User with the same email already exists",
        success: false,
      });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Registered Successfully", success: true });
  } catch (error) {
    console.error(`Register Controller Error: ${error.message}`);
    res.status(500).send({ success: false, message: "Server Error" });
  }
};

// Auth Controller
const authController = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    user.password = undefined;
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }
    res.status(200).send({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(`Auth Error: ${error.message}`);
    res.status(500).send({ message: "Server Error", success: false });
  }
};

// Lawyers List Controller
const getLawyersController = async (req, res) => {
  try {
    const lawyers = await lawyerModel.find({ status: "approved" });
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

// Appointment booking
const bookAppointmentController = async (req, res) => {
  try {
    const lawyerInfo = req.body.lawyerInfo || {};
    const userInfo = req.body.userInfo || {};
    const date = req.body.date || "";
    const time = req.body.time || "";

    const metadata = {
      lawyerId: lawyerInfo._id?.toString() || "",
      userId: userInfo._id?.toString() || "",
      date: date.toString(),
      time: time.toString(),
      lawyerUID: lawyerInfo.userId?.toString() || "",
      lawyerFname: lawyerInfo.firstName?.toString() || "",
      lawyerLname: lawyerInfo.lastName?.toString() || "",
      lawyerEmail: lawyerInfo.email?.toString() || "",
      username: userInfo.username?.toString() || "",
      userEmail: userInfo.email?.toString() || "",
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Consultation with ${metadata.lawyerFname} ${metadata.lawyerLname}`,
            },
            unit_amount: parseInt(lawyerInfo.feesConsultation) * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/lawyer-appointment/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/lawyer-appointment/payment/cancel`,
      metadata: metadata,
    });

    res.status(200).send({ success: true, url: session.url });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while initiating payment",
      error: error.message || error,
    });
  }
};

const paymentSuccessController = async (req, res) => {
  const session_id = req.body.sessionId;
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status === "paid") {
      const {
        lawyerId,
        userId,
        date,
        time,
        lawyerUID,
        lawyerFname,
        lawyerLname,
        lawyerEmail,
        username,
        userEmail,
      } = session.metadata;

      const newAppointment = new appointmentModel({
        lawyerId,
        userId,
        date,
        time,
        lawyerUID,
        lawyerFname,
        lawyerLname,
        lawyerEmail,
        username,
        userEmail,
      });
      await newAppointment.save();

      const user = await userModel.findById(lawyerUID);
      if (user) {
        user.notification.push({
          type: "New-appointment-request",
          message: `You have received a new Appointment Request. Check it here!`,
          onClickPath: "/Appointments-Page",
        });
        await user.save();
      }

      res.status(200).send({ success: true, message: "Appointment booked successfully." });
    } else {
      res.status(400).send({ success: false, message: "Payment not successful." });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error handling payment success.",
      error: error.message || error,
    });
  }
};

const bookingAvailabilityController = async (req, res) => {
  try {
    const date = req.body.date;
    const time = req.body.time;
    const lawyerId = req.body.lawyerId;

    const bufferPeriodMs = 45 * 60 * 1000; // 45 mins in ms

    const [requestedTimeString, requestedPeriod] = time.split(" ");
    const [requestedHour, requestedMinute] = requestedTimeString.split(":").map(Number);
    let requestedHour24 =
      requestedPeriod === "PM" && requestedHour !== 12
        ? requestedHour + 12
        : requestedHour;
    requestedHour24 = requestedPeriod === "AM" && requestedHour === 12 ? 0 : requestedHour24;

    const requestedTimeMs = (requestedHour24 * 60 + requestedMinute) * 60 * 1000;

    const appointments = await appointmentModel.find({ lawyerId, date });

    for (const appointment of appointments) {
      const [apptTimeString, apptPeriod] = appointment.time.split(" ");
      const [apptHour, apptMinute] = apptTimeString.split(":").map(Number);
      let apptHour24 =
        apptPeriod === "PM" && apptHour !== 12 ? apptHour + 12 : apptHour;
      apptHour24 = apptPeriod === "AM" && apptHour === 12 ? 0 : apptHour24;

      const apptTimeMs = (apptHour24 * 60 + apptMinute) * 60 * 1000;

      if (Math.abs(requestedTimeMs - apptTimeMs) < bufferPeriodMs) {
        return res.status(200).send({
          message: "Appointments not available at this time",
          success: false,
        });
      }
    }

    return res.status(200).send({
      message: "Appointment Available",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error checking booking availability",
      error: error.message || error,
    });
  }
};

const userAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({ userId: req.body.userId });
    res.status(200).send({
      message: "Appointments Fetched Successfully",
      success: true,
      data: appointments,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching appointments",
      error: error.message || error,
    });
  }
};


export {
  loginController,
  registerController,
  authController,
  getLawyersController,
  bookAppointmentController,
  bookingAvailabilityController,
  userAppointmentsController,
  paymentSuccessController,
};
