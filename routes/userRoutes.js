import express from 'express';
import { authController, bookAppointmentController, bookingAvailabilityController, getLawyersController, loginController, paymentSuccessController, registerController, userAppointmentsController } from '../controllers/userCtrl.js';
import { authMid } from '../middlewares/authMiddleware.js';
import { getAllNotificationController, deleteAllNotificationController } from '../controllers/notificationCtrl.js';

const router = express.Router();

//POST request routes
router.post('/login', loginController);
router.post('/register', registerController);
router.post('/getUser', authMid, authController);
router.post('/get-all-notification', authMid, getAllNotificationController);
router.post('/delete-all-notification', authMid, deleteAllNotificationController);
router.post('/book-appointment', authMid, bookAppointmentController);
router.post('/confirm-booking', authMid, paymentSuccessController);
router.post('/booking-availability', authMid, bookingAvailabilityController);

//GET request routes
router.get('/getLawyers', getLawyersController);
router.get('/appointments', authMid, userAppointmentsController);

export default router;