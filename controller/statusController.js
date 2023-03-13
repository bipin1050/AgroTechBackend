const cartModel = require("../models/cartModel");
const planModel = require("../models/planModel");
const userModel = require("../models/userModel");
const statusModel = require("../models/statusModel");
const notificationModel = require("../models/notificationModel");
const notificationStatusModel = require("../models/notificationStatusModel");
const truckerModel = require("../models/truckerModel");

module.exports.seeProductStatus = async function seeProductStatus(req, res) {
  try {
    userid = req.id;
    role = req.role;
    if (role === "admin") {
      let plans = await statusModel.find({ status: "Processing" });
      return res.status(200).json({
        message: "Got product for admin",
        data: plans,
      });
    }
    let plans = await statusModel
      .find({
        $or: [{ sellerid: req.id }, { buyerid: req.id }],
      })
      .select("productname quantity status price");
    res.status(200).json({
      message:
        "Got status successfully seeProductStatus statusController controller",
      plans: plans,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.changeProductStatus = async function changeProductStatus(
  req,
  res
) {
  try {
    statusid = req.body.statusid;
    statusreq = req.body.status;
    await statusModel.findByIdAndUpdate(
      statusid,
      { status: statusreq },
      { new: true }
    );
    res.status(200).json({
      message:
        "Successfully changed status changeProductStatus statusController controller",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.seeOnlineTruckerStatus = async function seeOnlineTruckerStatus(
  req,
  res
) {
  try {
    const onlineDrivers = await userModel.find({
      role: "trucker",
      availability: "online",
    });
    res.status(200).json({
      message:
        "Received online drivers' list seeOnlineTruckerStatus statusController controller",
      data: onlineDrivers,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.postNotification = async (req, res) => {
  try {
    const { notification, role } = req.body;
    const notify = await notificationModel.create({
      notification: notification,
    });
    const notifyid = notify._id.toHexString();
    const user = await userModel.find({ role: role }).select("_id");
    const users = [];
    for (let i = 0; i < user.length; i++) {
      users.push(user[i]._id.toHexString());
    }

    for (let i = 0; i < users.length; i++) {
      await notificationStatusModel.create({
        notificationId: notifyid,
        userId: users[i],
        status: 1,
      });
    }
    res.status(200).json({ message: "Successful notification send" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getNotification = async (req, res) => {
  try {
    const id = req.id;
    notification = await notificationStatusModel
      .find({ userId: id })
      .sort({ _id: -1 })
      .limit(10);
    let count = 0;
    for (let i = 0; i < notification.length; i++) {
      if (notification[i].status === 1) {
        count++;
      }
    }
    let notify = [];
    for (let i = 0; i < notification.length; i++) {
      notify.push(
        await notificationModel.findById(notification[i].notificationId)
      );
    }
    console.log(notify);
    res.status(200).json({
      message: "Notification received",
      count: count,
      notification: notify,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getNotificationCount = async (req, res) => {
  try {
    const id = req.id;
    notification = await notificationStatusModel
      .find({ userId: id })
      .sort({ _id: -1 });
    let count = 0;
    for (let i = 0; i < notification.length; i++) {
      if (notification[i].status === 1) {
        count++;
      }
    }
    res.status(200).json({
      message: "Notification received",
      count: count,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateNotificationStatus = async (req, res) => {
  try {
    await notificationStatusModel.updateMany(
      { userId: req.id },
      { status: 0 },
      { new: true }
    );
    res.status(200).json({ message: "Successfully updated status" });
  } catch (err) {
    req.status(500).json({ message: err.message });
  }
};

module.exports.assignTrucker = async (req, res) => {
  try {
    const truckerId = req.body.truckerId;
    const statusId = req.body.statusId;
    for (let i = 0; i < statusId.length; i++) {
      const id = await truckerModel.create({
        truckerId: truckerId,
        productStatusId: statusId[i],
      });
    }
    for (let i = 0; i < statusId.length; i++) {
      const processingProducts = await statusModel.findById(statusId[i]);
      (processingProducts.status = "Trucker Assigned"),
        await processingProducts.save();
    }
    res.status(200).json({ message: "Trucker id assigned" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
