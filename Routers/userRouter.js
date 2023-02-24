const express = require("express");
const userRouter = express.Router();
const multer = require("multer");

const {
  getUser,
  getAllUser,
  updateUser,
  deleteUser,
  updateProfileImage,
} = require("../controller/userController");

const {
  signup,
  login,
  isAuthorised,
  protectRoute,
  forgetPassword,
  resetPassword,
  logout,
  isLogin
} = require("../controller/authController");
// const { filter } = require("lodash");

// User's Option
userRouter.route("/:id").patch(updateUser).delete(deleteUser);

userRouter.route("/signup").post(signup);

userRouter.route("/login").post(login);

userRouter.route("/forgetPassword").post(forgetPassword);

userRouter.route("/resetPassword/:token").post(resetPassword);

userRouter.route("/logout").get(logout);

userRouter.route("/isLogin").post(isLogin);

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const filter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image file! Please upload an image."), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: filter,
});

userRouter.post("/ProfileImage", upload.single("photo"), updateProfileImage);
userRouter.get("/ProfileImage", (req, res) => {
  res.sendFile("/home/bigyan/Desktop/test/test/multer.html");
});

// Profile Page
userRouter.use(protectRoute);
userRouter.route("/userProfile").get(getUser);

// Admin specific function
userRouter.use(isAuthorised(["admin"]));
userRouter.route("/").get(getAllUser);

module.exports = userRouter;
