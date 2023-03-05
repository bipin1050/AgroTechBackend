const mongoose = require("mongoose");

const db_link =
  "mongodb+srv://admin:0PebVC1tNiGV6XrJ@cluster0.qipytgs.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db_link)
  .then(function (db) {
    // console.log(db);
    console.log("plan db connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [20, "Plan name should not exceed more than 20 characters"],
  },
  unit: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    maxLength: [20, "Plan name should not exceed more than 20 characters"],
  }
});

const productModel = mongoose.model("productModel", productSchema);

(async function createPlan() {
  let planObj = {
    name: "Banana",
    category:"dozen",
    unit: "kg",
  };
  let data = await productModel.create(planObj);
  console.log(data);
  //   const data = new planModel(planObj);
  //   await data.save();
  //   console.log(data);
})();

module.exports = productModel;
