const mongoose = require("mongoose");

const db_link =
  "mongodb+srv://admin:0PebVC1tNiGV6XrJ@cluster0.qipytgs.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db_link)
  .then(function (db) {
    // console.log(db);
    console.log("status db connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const statusSchema = new mongoose.Schema({
  buyerid: {
    type: String,
    required: true,
  },
  sellerid: {
    type: String,
    required: true,
  },
  productname: {
    type: String,
    required: true,
  },
  quantiy: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const statusModel = mongoose.model("statusModel", statusSchema);

(async () => {
  let statusObj = {
    buyerid: "63e67d83221baa346b21d30e",
    sellerid: "63f9e99ab602e8f99e781dc4",
    productname: "Apple",
    quantiy: 14,
    price: 1400,
    status: "Delivered",
  };
  let data = await statusModel.create(statusObj);
  console.log(data);
  // const data = new planModel(planObj);
  // await data.save();
  // console.log(data);
})();

module.exports = statusModel;
