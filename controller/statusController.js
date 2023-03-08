const cartModel = require("../models/cartModel");
const planModel = require("../models/planModel");
const userModel = require("../models/userModel");
const statusModel = require("../models/statusModel");
const notificationModel=require("../models/notificationModel")
const notificationStatusModel=require("../models/notificationStatusModel")

module.exports.seeProductStatus = async function seeProductStatus(req, res) {
  try {
    userid = req.id;
    let plans = await statusModel.find({ sellerid: req.id });
    res.status(200).json({
      message:
        "Got status successfully seeProductStatus statusController controller",
      plans: plans,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.changeProductStatus = async function changeProductStatus(
  req,
  res
) {
  try {
    statusid = req.body.statusid;
    statusreq = req.body.status;
    await statusModel.findByIdAndUpdate(
      statusid,
      { status: statusreq },
      { new: true }
    );
    res.status(200).json({
      message:
        "Successfully changed status changeProductStatus statusController controller",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.seeOnlineTruckerStatus = async function seeOnlineTruckerStatus(
  req,
  res
) {
  try {
    const onlineDrivers = await userModel.find({ availability: "Online" });
    res.status(200).json({
      message:
        "Received online drivers' list seeOnlineTruckerStatus statusController controller",
      data: onlineDrivers,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.postNotification = async (req,res)=>{
  try{
    const {notification,role}=req.body
    const notify=await notificationModel.create({notification:notification})
    const notifyid=notify._id.toHexString()
    const user=await userModel.find({role:role}).select('_id')
    const users=[]
    for(let i=0;i<user.length;i++){
      users.push(user[i]._id.toHexString())
    }

    for(let i=0;i<users.length;i++){
      await notificationStatusModel.create({notificationId:notifyid,userId:users[i],status:1})
    }
    res.status(200).json({message:"Successful notification send"})
  }catch(err){
    res.status(500).json({message:err.message})
  }
}

module.exports.getNotification = async (req,res)=>{
  try{
    const id=req.id;
    notification=await notificationStatusModel.find({userId:id})
    let count=0;
    for(let i=0;i<notification.length;i++){
      if(notification[i].status===1){
        count++
      }
    }
    let notify=[]
    for(let i=0;i<notification.length;i++){
      notify.push(await notificationModel.findById(notification[i].notificationId))
    }
    res.status(200).json({
      message:"Notification received",
      count:count,
      notification:notify
    })
  }catch(err){
    res.status(500).json({message:err.message})
  }
}

module.exports.updateNotificationStatus= async (req,res)=>{
  try{
    const {notificationId}=req.body
    for(let i=0;i<notificationId.length;i++){
      await notificationStatusModel.findByIdAndUpdate(notificationId[i],{status:0},{new:true})
      res.status(200).json({message:"Successfully updated status"})
    }
  }catch(err){

  }
}
