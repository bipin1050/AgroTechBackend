const express = require("express");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const JWT_KEY = require("../secrets");
const { sendMail } = require("../utility/nodemailer");

// Signup
module.exports.signup = async function signUp(req, res) {
  try {
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    sendMail("signup", user);
    if (user) {
      return res.status(200).json({
        message: "SignedUp signUp authController controller",
        data: user,
      });
    } else {
      res.status(400).json({
        message: "Error signUp authController controller",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.verifysignup= async (req,res)=>{
  try{
    const id=req.params.id
    await userModel.findByIdAndUpdate(id,{verified:true},{new:true})
    res.status(200).json({message:"Successfully verified"})
  }catch(err){
    res.status(500).json({message:err.message})
  }
}

// Login
module.exports.login = async function loginUser(req, res) {
  try {
    let data = req.body;

    if (data.email) {
      let user = await userModel.findOne({ email: data.email });
      let role = await userModel.where({ email: data.email });

      if (user) {
        if (user.password == data.password) {
          let uid = user["_id"];
          let token = jwt.sign({ payload: uid }, JWT_KEY, {
            expiresIn: "5 days",
          });
          res.cookie("login", token, { httpOnly: true });
          return res.status(200).json({
            message:
              "User logged in succesfully loginUser authController controller",
            role: role[0].role,
            jwt: token,
            name: user.name,
            email: user.email,
          });
        } else {
          return res.status(400).json({
            message: "Wrong credentials loginUser authController controller",
          });
        }
      } else {
        return res.status(400).json({
          message: "User not found loginUser authController controller",
        });
      }
    } else {
      return res.status(400).json({
        message: "Empty field found loginUser authController controller",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err,
    });
  }
};

// Protect route
module.exports.protectRoute = async function protectRoute(req, res, next) {
  try {
    let token = req.body.headers.authorization;
    if (token) {
      let payload = jwt.verify(token, JWT_KEY);
      if (payload) {
        const user = await userModel.findById(payload.payload);
        req.role = user.role;
        req.id = user.id;
        next();
      }
    } else {
      // Postman
      res.status(400).json({
        message: "Please login protectRoute authController controller",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "failed to authorize",
    });
  }
};

//Added because protectroute had issue handling form data validation
module.exports.protectRouteForm = async function protectRouteForm(
  req,
  res,
  next
) {
  try {
    let token = req.headers.authorization;
    if (token) {
      let payload = jwt.verify(token, JWT_KEY);
      if (payload) {
        const user = await userModel.findById(payload.payload);
        req.role = user.role;
        req.id = user.id;
        next();
      }
    } else {
      // Postman
      res.status(400).json({
        message: "Please login protectRoute authController controller",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "failed to authorize",
    });
  }
};

module.exports.isLogin = async function isLogin(req, res) {
  try {
    //console.log(req.cookies.login);
    let token = req.body.headers.authorization;
    if (token) {
      let payload = jwt.verify(token, JWT_KEY);
      if (payload) {
        const user = await userModel.findById(payload.payload);
        req.id = user.id;
        res.status(200).json({
          name: user.name,
          role: user.role,
          email: user.email,
        });
      }
    } else {
      // Postman
      res.status(400).json({
        message: "Please login protectRoute authController controller",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// isAuthorised: To check user's role
module.exports.isAuthorised = function isAuthorised(roles) {
  return function (req, res, next) {
    if (roles.includes(req.role) == true) {
      next();
    } else {
      res.status(401).json({
        message: "Operation not allowed isAuthorised authController controller",
      });
    }
  };
};

// Forget password
module.exports.forgetPassword = async function forgetPassword(req, res) {
  let { email } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      // createResetToken is used to create a new token
      const resetToken = userModel.createResetToken();
      // http://abc.com/resetPassword/resetToken
      let resetPasswordLink = `${req.protocol}://${req.get(
        "host"
      )}/resetPassword/${resetToken}`;
      let obj = {
        resetPasswordLink: resetPasswordLink,
        email: email,
      };
      sendMail("resetpassword", obj);
      return res.json({
        message:
          "Link sent to reset password forgetPassword authController controller",
      });
    } else {
      return res.json({
        message: "Please Signup forgetPassword authController controller",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

// Reset password
module.exports.resetPassword = async function resetPassword(req, res) {
  try {
    const token = req.params.token;
    let { password, confirmPassword } = req.body;
    const user = await userModel.findOne({ resetToken: token });
    if (user) {
      // resetPasswordHandler will update user's password in db
      user.resetPasswordHandler(password, confirmPassword);
      await user.save();
      res.json({
        message:
          "Password changed successfully. Please login again resetPassword authController controller.",
      });
    } else {
      res.json({
        message: "User not found resetPassword authController controller.",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

