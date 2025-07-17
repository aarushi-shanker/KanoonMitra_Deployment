import mongoose from 'mongoose';

const lawyerSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
  phone: {
    type: String,
    required: [true, 'Phone is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  website: {
    type: String,
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  specialization: {
    type: String,
    required: [true, 'Specialization is required']
  },
  experience: {
    type: String,
    required: [true, 'Experience is required']
  },
  feesConsultation: {
    type: String,
    required: [true, 'Fees for consultation are required']
  },
  status: {
    type: String,
    default: 'pending'
  },
  timings: {
    type: Object,
    required: [true, 'Work timings are required']
  },
  profilePhoto: {
    type: String,
  },
}, { timestamps: true });

const lawyerModel = mongoose.model('lawyers', lawyerSchema);

export default lawyerModel;