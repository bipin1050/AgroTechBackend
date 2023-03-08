const mongoose = require("mongoose");
const product=require("../utility/products")
const db_link =
  "mongodb+srv://admin:0PebVC1tNiGV6XrJ@cluster0.qipytgs.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db_link)
  .then(function (db) {
    // console.log(db);
    console.log("product db connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  unit:{
    type:String,
    required:true
  }
});

const productModel = mongoose.model("productModel", productSchema);

(async function createPlan() {
    // for(let i=0;i<product.product.length;i++){
    //     await productModel.create(product.product[i])
    //     console.log("done")
    // }
    console.log(await productModel.count())
  //let data = await productModel.create(product);
  //console.log(data);
    // const data = new planModel(planObj);
    // await data.save();
    // console.log(data);
})();

module.exports = productModel;
