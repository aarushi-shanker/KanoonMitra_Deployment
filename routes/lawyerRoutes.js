import express from 'express';
import { authMid } from '../middlewares/authMiddleware.js';
import { applyLawyerController, upload, getLawyerInfoController, updateProfileController, getLawyerByIdController, lawyerAppointmentsController, updateStatusController } from '../controllers/lawyerCtrl.js';

const lawyerRouter = express.Router();

//POST routes
lawyerRouter.post('/getLawyerInfo', authMid, getLawyerInfoController);
lawyerRouter.post('/updateProfile', authMid, upload.single('profilePhoto'), updateProfileController);
lawyerRouter.post('/apply-lawyer', authMid, upload.single('profilePhoto'), applyLawyerController);
lawyerRouter.post('/getLawyerById', authMid, getLawyerByIdController)
lawyerRouter.post('/update-appointment-status', authMid, updateStatusController)
//GET route
lawyerRouter.get('/appointments', authMid, lawyerAppointmentsController);

export default lawyerRouter;