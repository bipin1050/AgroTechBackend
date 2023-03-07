const userModel = require("../models/userModel");

module.exports.getUser = async function getUser(req, res) {
  // console.log(req.query);
  let id = req.params.id;
  let user = await userModel.findOne(id);
  if (user) {
    return res.json(user);
  } else {
    return res.json({
      message: "User not found getUser userController",
    });
  }
};

module.exports.getAllUser = async function getAllUser(req, res) {
  try {
    let users = await userModel.find();
    if (users) {
      res.json({
        message: "Users retrieved getAllUser userController",
        data: users,
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.updateUser = async function updateUser(req, res) {
  try {
    let id = req.params.id;
    let dataToBeUpdated = req.body;
    let user = await userModel.findById(id);
    if (user) {
      const keys = [];
      for (let key in dataToBeUpdated) {
        keys.push(key);
      }
      for (let i = 0; i < keys.length; i++) {
        user[keys[i]] = dataToBeUpdated[keys[i]];
      }
      const updatedData = await user.save();
      res.json({
        message: "Data updated successfully updateUser userController",
        data: user,
      });
    } else {
      res.json({
        message: "User not found updateUser userController",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.deleteUser = async function deleteUser(req, res) {
  try {
    let id = req.params.id;
    let user = await userModel.findByIdAndDelete(id);
    if (!user) {
      res.json({
        message: err.message,
      });
    }
    res.json({
      message: "Data has been deleted deleteUser userController ",
      data: user,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.updateProfileImage = function updateProfileImage(req, res) {
  res.json({
    message: "File uploaded successfully.",
  });
};
