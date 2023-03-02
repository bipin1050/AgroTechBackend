const cartModel = require("../models/cartModel");
const planModel = require("../models/planModel");
const userModel = require("../models/userModel");
const statusModel = require("../models/statusModel");

module.exports.getStatusFarmer = async function getStatusFarmer(req, res) {
  try {
    userid = req.id;
    let plans = await statusModel.find({ sellerid: req.id });
    res.status(200).json({
      message:
        "Got status successfully getStatusFarmer statusController controller",
      plans: plans,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.changeStatusFarmer = async function changeStatusFarmer(
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
        "Successfully dispatched changeStatusFarmer statusController controller",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
