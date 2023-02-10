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

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: [20, "Plan name should not exceed more than 20 characters"],
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "Price not entered"],
  },
  ratingsAverage: {
    type: Number,
  },
  discount: {
    type: Number,
    validate: [
      function () {
        return this.discount < 100;
      },
      "Discount should not exceed price",
    ],
  },
});

const planModel = mongoose.model("planModel", planSchema);

// (async function createPlan() {
//   let planObj = {
//     name: "Orange1",
//     duration: 20,
//     price: 135,
//     ratingsAverage: 6,
//     discount: 15,
//   };
//   let data = await planModel.create(planObj);
//   console.log(data);
//   //   const data = new planModel(planObj);
//   //   await data.save();
//   //   console.log(data);
// })();

module.exports = planModel;
