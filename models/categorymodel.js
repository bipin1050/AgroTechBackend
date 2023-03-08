const mongoose = require("mongoose");

const db_link =
  "mongodb+srv://admin:0PebVC1tNiGV6XrJ@cluster0.qipytgs.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db_link)
  .then(function (db) {
    // console.log(db);
    console.log("category db connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const categoryModel = mongoose.model("categoryModel", categorySchema);

// (async function createPlan() {
//   let categoryObj = {
//     name: "Pickles, Jams & Ketchups",
//   };
//   let data = await categoryModel.create(categoryObj);
//   console.log(data);
//   //   const data = new planModel(planObj);
//   //   await data.save();
//   //   console.log(data);
// })();

// (async ()=>{
//   let data= await categoryModel.find()
//   console.log(data)
// })()

module.exports = categoryModel;
