const mongoose = require("mongoose");

const db_link =
  "mongodb+srv://admin:0PebVC1tNiGV6XrJ@cluster0.qipytgs.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db_link)
  .then(function (db) {
    // console.log(db);
    console.log("notification status db connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const notificationStatusSchema = new mongoose.Schema({
  notificationId: {
    type: String,
    required: true,
  },
  userId:{
    type:String,
    required:true
  },
    status:{
        type:Number,
        required:true
    }  
});

const notificationStatusModel = mongoose.model("notificationStatusModel", notificationStatusSchema);

// (async function createPlan() {
//   let cartObj = {
//     userid:"638861c897084d99b3d776bd" ,
//     productid: "6391a5b27a32deedd69afa6b",
//   };
//   let data = await notificationStatusModel.create(cartObj);
//   console.log(data);
//     // const data = new planModel(planObj);
//     // await data.save();
//     // console.log(data);
// })();

module.exports = notificationStatusModel;
