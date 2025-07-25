import userModel from "../models/userModel.js";
import lawyerModel from "../models/lawyerModel.js";

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
      message: `Your Lawyer Account ${status === 'removed'? '' : 'Request'} has been ${status}`,
    });

    if (status === "approved" && user) {
      user.isLawyer = true;
    }
    else user?.isLawyer = false;
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
    res
      .status(200)
      .json({
        success: true,
        message: `User ${
          user.isBlocked ? "blocked" : "unblocked"
        } successfully`,
      });
  } catch (error) {
    res.status(500).send({ success: false, message: "Server Error", error });
  }
}

export {
  getAllUsersController,
  getAllLawyersController,
  changeStatusController,
  toggleBlockController
};
