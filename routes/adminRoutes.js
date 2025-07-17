import express from "express";
import { authMid } from "../middlewares/authMiddleware.js";
import {
  changeStatusController,
  getAllLawyersController,
  getAllUsersController,
  toggleBlockController,
} from "../controllers/adminCtrl.js";

const adminRouter = express.Router();

//GET request routes
adminRouter.get("/getAllUsers", authMid, getAllUsersController);
adminRouter.get("/getAllLawyers", authMid, getAllLawyersController);

//POST request route
adminRouter.post("/changeStatus", authMid, changeStatusController);

//PUT request route
// Block or Unblock User
adminRouter.put("/block/:id", authMid, toggleBlockController);

export default adminRouter;
