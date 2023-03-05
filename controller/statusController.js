const cartModel = require("../models/cartModel");
const planModel = require("../models/planModel");
const userModel = require("../models/userModel");
const statusModel = require("../models/statusModel");

module.exports.seeProductStatus = async function seeProductStatus(req, res) {
  try {
    userid = req.id;
    let plans = await statusModel.find({ sellerid: req.id });
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
    const onlineDrivers = await userModel.find({ availability: "Online" });
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
