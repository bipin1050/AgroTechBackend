const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const db_link =
  "mongodb+srv://admin:0PebVC1tNiGV6XrJ@cluster0.qipytgs.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db_link)
  .then(function (db) {
    // console.log(db);
    console.log("user db connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  // confirmPassword: {
  //   type: String,
  //   required: true,
  //   minLength: 8,
  //   validate: function () {
  //     return this.confirmPassword == this.password;
  //   },
  // },
  role: {
    type: String,
    enum: ["admin", "retailer/wholesaler", "farmer", "trucker"],
    dafault: "retailer/wholesaler/wholesaler",
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  profileImage: {
    type: String,
    dafault: "img/users/dafault.jpeg",
  },
  licenceNumber: {
    type: String,
  },
  availability: {
    type: String,
    enum: ["Offline", "Online", "Busy", "Delivering: On the way"],
    default: "Offline",
  },
  resetToken: String,
});

// // Pre & Post Hooks
// userSchema.pre("save", function () {
//   console.log("Before saving in db", this);
// });

// userSchema.post("save", function (doc) {
//   console.log("After saving in db", doc);
// });

// Not saving confirmPassword in db
// userSchema.pre("save", function () {
//   this.confirmPassword = undefined;
// });

userSchema.methods.createResetToken = function () {
  // Creating unique token using npm crypto
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetToken = resetToken;
  return resetToken;
};

userSchema.methods.resetPasswordHandler = function (password, confirmPassword) {
  this.password = password;
  this.confirmPassword = confirmPassword;
  this.resetToken = undefined;
};

// userSchema.pre("save", async function () {
//   let salt = await bcrypt.genSalt();
//   let hashedString = await bcrypt.hash(this.password, salt);
//   this.password = hashedString;
//   console.log(hashedString);
// });

// Model
const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;

// (async function createUser() {
//   let user = {
//     name: "Pradip",
//     email: "pradip@gmail.com",
//     password: "12345678",
//     latitude: 78.396591,
//     longitude: 29.454,
//     licenceNumber: "234343",
//     availability: "Online",
//   };
//   let data = await userModel.create(user);
//   console.log(data);
// })();
