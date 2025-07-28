import express from "express";
import { authMid } from "../middlewares/authMiddleware.js";
import {
  changeStatusController,
  getAllLawyersController,
  getAllUsersController,
  getAllAppointmentsController,
  toggleBlockController,
  statsController,
  logsController,
  getWeeklyAnalyticsController,
} from "../controllers/adminCtrl.js";

const adminRouter = express.Router();

//GET request routes
adminRouter.get("/stats", authMid, statsController);
adminRouter.get("/logs", authMid, logsController);
adminRouter.get("/analytics", authMid, getWeeklyAnalyticsController);
adminRouter.get("/getAllUsers", authMid, getAllUsersController);
adminRouter.get("/getAllLawyers", authMid, getAllLawyersController);
adminRouter.get("/getAllAppointments", authMid, getAllAppointmentsController);

//POST request route
adminRouter.post("/changeStatus", authMid, changeStatusController);

//PUT request route
// Block or Unblock User
adminRouter.put("/block/:id", authMid, toggleBlockController);

export default adminRouter;
