import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  lawyerId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: [true, "email is required"],
  },
  lawyerEmail: {
    type: String,
    required: [true, "email is required"],
  },
  lawyerFname: {
    type: String,
    required: true
  },
  lawyerLname: {
    type: String,
    required: true
  },
  lawyerUID: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'pending'
  },
}, { timestamps: true });

const appointmentModel = mongoose.model('appointments', appointmentSchema);

export default appointmentModel;