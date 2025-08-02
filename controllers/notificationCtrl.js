import userModel from '../models/userModel.js';

const getAllNotificationController = async(req, res) => {
    try {
        const userId = req.body.userId;
        const user = await userModel.findOne({ _id: userId });        
        user.seenNotification.push(...user.notification);
        user.notification = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success:true,
            message: "all notifications are marked as read",
            data: updatedUser,
        })
    }catch(error) {
        await logEvent("ERROR", "NOTIFICATION", {
            message: `Error in notification. Error : ${error.message}`,
        });
       res.status(500).send({
        message: 'Error in notification',
        success: false,
        error
       }) 
    }
}

const deleteAllNotificationController = async(req, res) => {
    try {
        const userId = req.body.userId;
        const user = await userModel.findOne({ _id: userId });
        user.seenNotification = []
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success:true,
            message: "Seen notifications deleted successfully",
            data: updatedUser,
        })
    } catch (error) {
        await logEvent("ERROR", "NOTIFICATION", {
            message: `Error to delete all notifications. Error : ${error.message}`,
        });
        res.status(500).send({
            success: false,
            message: 'unable to delete all notifications',
            error
        })
    }
}

export { getAllNotificationController, deleteAllNotificationController };