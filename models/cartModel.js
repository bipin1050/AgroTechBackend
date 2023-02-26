const mongoose = require("mongoose");

const db_link =
  "mongodb+srv://admin:0PebVC1tNiGV6XrJ@cluster0.qipytgs.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db_link)
  .then(function (db) {
    // console.log(db);
    console.log("cart db connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const cartSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  productid: {
    type: String,
    required: true,
  },
});

const cartModel = mongoose.model("cartModel", cartSchema);

// (async function createCart() {
//   let cartObject = {
//     userid: "638861c897084d99b3d776bd",
//     productid: "638cd7fe872923a63d235bb1",
//   };
//   let data = await cartModel.create(cartObject);
//   console.log(data);
//   // const data = new cartModel(planObj);
//   // await data.save();
//   // console.log(data);
// })();

module.exports = cartModel;
