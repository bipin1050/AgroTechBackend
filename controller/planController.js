const cartModel = require("../models/cartModel");
const planModel = require("../models/planModel");
const userModel = require("../models/userModel");
const statusModel = require("../models/statusModel");
const categoryModel = require("../models/categorymodel");
const productModel=require("../models/productModel")
const { upload } = require("../utility/multer");

module.exports.getAllPlans = async function getAllPlans(req, res) {
  try {
    let skipby = req.params.id * 10;
    let plans = await planModel.find().skip(skipby).limit(10);
    let totalcount = await planModel.count();
    totalcount = totalcount / 10;
    if (plans) {
      return res.json({
        message: "All plans retrieved getAllPlans planController controller",
        data: plans,
        totalcount: totalcount,
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

module.exports.getCategory = async function getCategory(req, res) {
  try {
    let category = await categoryModel.find();
    res.status(200).json({
      message: "Categories added",
      data: category,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error faced",
    });
  }
};

module.exports.productList=async (req,res)=>{
  try{
    const product=await productModel.find().select('name').sort({name:1})
    res.status(200).json({
      message:"Got product list",
      product:product
    })
  }catch(err){
    res.status(500).json({message:err.message})
  }
}

module.exports.productHelper=async (req,res)=>{
  try{
    let productId=req.body.productId
    if(!productId){
      res.status(400).json({message:"Error in input"})
    }
    let category=await productModel.findById(productId).select('category unit')
    res.status(200).json({
      message:"Get category and unit",
      category:category
    })
  }catch(err){
      res.status(500).status({message:err.message})
  }
}

module.exports.getCart = async function getCart(req, res) {
  try {
    let userid = req.id;
    const productid = await cartModel.find({ userid: userid });
    let productarray = [];
    for (let i = 0; i < productid.length; i++) {
      productarray.push(productid[i].productid);
    }
    let products = [];
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
    const id=await planModel.findById(productid).select('userid')
    console.log(id.userid,userid)
    if(id.userid===userid){
      return res.status(500).json({message:"Not allowed purchase"})
    }
    let checkProduct = await cartModel.find({
      userid: userid,
      productid: productid,
    });

    if (checkProduct.length >= 1) {
      return res.status(400).json({
        message: "Item already in cart addCart planController controller",
        data: productid,
      });
    }
    let product = {
      userid: userid,
      productid: productid,
    };
    let createdData = await cartModel.create(product);
    return res.status(200).json({
      message: "Added to cart successfully addCart planController controller",
      data: createdData,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.deleteCart = async function deleteCart(req, res) {
  try {
    let productid = req.params.id;
    let userid = req.id;
    let deletedPlan = await cartModel.findOneAndDelete({
      userid: userid,
      productid: productid,
    });
    return res.status(200).json({
      message: "Plan deleted successfully deletePlan planController controller",
      data: deletedPlan,
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
    req.body.image = req.file.filename;
    const productId=req.body.productId
    const name=await productModel.findById(productId).select('name')
    delete req.body.productId
    req.body.name=name.name
    let planData = req.body;
    let createdData = await planModel.create(planData);
    return res.status(200).json({
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
    return res.status(200).json({
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
    let cartPlan = await cartModel.findOneAndDelete({
      userid: req.id,
      productid: id,
    });
    return res.status(200).json({
      message: "Plan deleted successfully deletePlan planController controller",
      data: deletedPlan,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.buyProduct = async (req, res) => {
  try {
    let { productid, number } = req.body;
    let availableproduct = await planModel.findById(productid);
    if(availableproduct.userid===req.id)
    {
      res.status(500).json({message:"Can't buy the product"})
    }
    if (availableproduct.quantity < number) {
      res.status(400).json({ message: "Available Product low in stock" });
    } else if (availableproduct.quantity > number) {
      let temp = availableproduct.quantity - number;
      let updated = await planModel.findByIdAndUpdate(
        productid,
        { quantity: temp },
        { new: true }
      );
      await cartModel.findOneAndDelete({
        userid: req.id,
        productid: productid,
      });
      await statusModel.create({
        buyerid: req.id,
        sellerid: availableproduct.userid,
        productname: availableproduct.name,
        quantiy: number,
        price: availableproduct.price,
        status: "Processing",
      });
      res.status(200).json({ message: "Successful purchase" });
    } else if (availableproduct.quantity === number) {
      await planModel.findByIdAndDelete(productid);
      await cartModel.findOneAndDelete({
        userid: req.id,
        productid: productid,
      });
      res.status(200).json({ message: "Product purchased and deleted" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error in buyProduct",
    });
  }
};

module.exports.updatePlan = async function updatePlan(req, res) {
  try {
    let id = req.params.id;
    let dataToBeUpdated = req.body.editProduct;
    let keys = [];
    for (let key in dataToBeUpdated) {
      keys.push(key);
    }
    console.log(keys);
    let plan = await planModel.findById(id);
    for (let i = 0; i < keys.length; i++) {
      plan[keys[i]] = dataToBeUpdated[keys[i]];
    }
    await plan.save();
    return res.status(200).json({
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
