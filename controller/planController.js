const cartModel = require("../models/cartModel");
const planModel = require("../models/planModel");
const userModel = require("../models/userModel");
const statusModel = require("../models/statusModel");
const categoryModel = require("../models/categorymodel");
const productModel = require("../models/productModel");
const { upload } = require("../utility/multer");
const axios = require("axios");

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

module.exports.getProductByCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const products = await planModel.find({ category: category });
    res.status(200).json({
      message: "Get product by category",
      data: products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.productList = async (req, res) => {
  try {
    const product = await productModel.find().select("name").sort({ name: 1 });
    res.status(200).json({
      message: "Got product list",
      product: product,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.productHelper = async (req, res) => {
  try {
    let productId = req.body.productId;
    if (!productId) {
      res.status(400).json({ message: "Error in input" });
    }
    let category = await productModel
      .findById(productId)
      .select("name category unit");
      let currentDate=new Date()
     const price=await axios.post("http://127.0.0.1:5000/predict_price",{
        Commodity:category.name,
        Year:currentDate.getFullYear(),
        Month:currentDate.getMonth()+1,
        Day:currentDate.getDate()
      })
    res.status(200).json({
      message: "Get category and unit",
      category: category,
      price:price.data.Price
    });
  } catch (err) {
    res.status(500).status({ message: err.message });
  }
};

module.exports.search = async (req, res) => {
  try {
    term = req.params.term;
    const plan = await planModel
      .find()
      .select(
        "name quantity unit category image price duration ratingAverage discount "
      );
    plans = [];
    for (let i = 0; i < plan.length; i++) {
      if (plan[i].name.toLowerCase().includes(term.toLowerCase())) {
        plans.push(plan[i]);
      }
      if (plan[i].category.toLowerCase().includes(term.toLowerCase())) {
        plans.push(plan[i]);
      }
    }
    res.status(200).json({
      message: "Items found",
      data: plans,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
    const id = await planModel.findById(productid).select("userid");
    console.log(id.userid, userid);
    if (id.userid === userid) {
      return res.status(500).json({ message: "Not allowed purchase" });
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
    const productId = req.body.productId;
    const name = await productModel.findById(productId).select("name");
    delete req.body.productId;
    req.body.name = name.name;
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

module.exports.buyProductKhalti = async (req, res) => {
  try {
    let { productid, number } = req.body;
    let availableproduct = await planModel.findById(productid);
    if (availableproduct.userid === req.id) {
      return res.status(500).json({ message: "Can't buy the product" });
    }
    if (availableproduct.quantity < number) {
      return res
        .status(400)
        .json({ message: "Available Product low in stock" });
    }
    let paymentURL;
    axios
      .post(
        "https://khalti.com/api/v2/epayment/initiate/",
        {
          return_url: `http://localhost:3000/payment?productid=${productid}&number=${number}`,
          website_url: "http://localhost:3000",
          amount: Math.ceil(
            100 *
              number *
              availableproduct.price *
              (1 - availableproduct.discount / 100)
          ),
          purchase_order_id: productid,
          purchase_order_name: availableproduct.name,
        },

        {
          headers: {
            Authorization:
              "Key live_secret_key_7a74090b028e4a99b562ea9e68eab1de",
          },
        }
      )
      .then((response) => {
        paymentURL = response.data.payment_url;
        res.status(200).json({ paymentURL: paymentURL });
      });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.buyProduct = async (req, res) => {
  try {
    let { productid, number, mode } = req.body;
    let availableproduct = await planModel.findById(productid);
    if (availableproduct.userid === req.id) {
      return res.status(500).json({ message: "Can't buy the product" });
    }
    if (availableproduct.quantity < number) {
      return res
        .status(400)
        .json({ message: "Available Product low in stock" });
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
        quantity: number,
        price: availableproduct.price,
        status: "Processing",
        paymentStatus: mode,
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
      message: err.message,
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
