const cartModel = require("../models/cartModel");
const planModel = require("../models/planModel");

module.exports.getAllPlans = async function getAllPlans(req, res) {
  try {
    let plans = await planModel.find();
    if (plans) {
      return res.json({
        message: "All plans retrieved getAllPlans planController controller",
        data: plans,
      });
    } else {
      return res.json({
        message: "Plans not found getAllPlans planController controller",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.getPlan = async function getPlan(req, res) {
  try {
    let id = req.params.id;
    let plan = await planModel.findById(id);
    if (plan) {
      return res.status(200).json({
        message: "Plan retrieved getPlan planController controller",
        data: plan,
      });
    } else {
      return res.status(400).json({
        message: "Plan not found getPlan planController controller",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error faced",
    });
  }
};

module.exports.getCart = async function getCart(req, res) {
  try {
    let userid = req.id;
    console.log(userid);
    const productid = await cartModel.find({ userid: userid });
    console.log(productid);
    let productarray = [];
    for (let i = 0; i < productid.length; i++) {
      productarray.push(productid[i].productid);
    }
    let products = [];
    console.log(productarray);
    for (let i = 0; i < productarray.length; i++) {
      let product = await planModel.findById(productarray[i]);
      products.push(product);
    }
    res.status(200).json({
      products: products,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error from getCart planController controller",
      mes: err.message,
    });
  }
};

module.exports.addCart = async function addCart(req, res) {
  try {
    let userid = req.id;
    let productid = req.body.productid;
    let product = {
      userid: userid,
      productid: productid,
    };
    let createdData = await cartModel.create(product);
    return res.json({
      message: "Added to cart successfully addCart planController controller",
      data: createdData,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.createPlan = async function createPlan(req, res) {
  try {
    req.body.userid = req.id;
    let planData = req.body;
    let createdData = await planModel.create(planData);
    return res.json({
      message: "Plan created successfully createPlan planController controller",
      data: createdData,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.getPlanByFarmer = async function getPlanByFarmer(req, res) {
  try {
    let data = await planModel.find({ userid: req.id });
    return res.json({
      message:
        "Data fetched from a specific farmer getPlanByFarmer planController controller",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      message:
        "From getPlanByFarmer  getPlanByFarmer planController controller",
    });
  }
};

module.exports.deletePlan = async function deletePlan(req, res) {
  try {
    let id = req.params.id;
    let deletedPlan = await planModel.findByIdAndDelete(id);
    return res.json({
      message: "Plan deleted successfully deletePlan planController controller",
      data: deletedPlan,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.updatePlan = async function updatePlan(req, res) {
  try {
    let id = req.params.id;
    let dataToBeUpdated = req.body;
    let keys = [];
    for (let key in dataToBeUpdated) {
      keys.push(key);
    }
    let plan = await planModel.findById(id);
    for (let i = 0; i < keys.length; i++) {
      plan[keys[i]] = dataToBeUpdated[keys[i]];
    }
    await plan.save();
    return res.json({
      message: "Plan updated successfully updatePlan planController controller",
      data: plan,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.top3Plans = async function top3Plans(req, res) {
  try {
    const plans = await planModel
      .find()
      .sort({
        ratingsAverage: -1,
      })
      .limit(3);
    return res.json({
      message: "Top 3 plans top3Plans planController controller",
      data: plans,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
