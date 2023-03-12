const mongoose=require("mongoose")

const db_link =
  "mongodb+srv://admin:0PebVC1tNiGV6XrJ@cluster0.qipytgs.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(db_link).then(function (db){
    console.log("trucker db connected")
}).catch(function(err){
    console.log(err)
})

const truckerSchema=mongoose.Schema({
    truckerId:{
        type:String,
        required:true
    },
    productStatusId:{
        type:String,
        required:true
    }
})

const truckerModel = mongoose.model("truckerModel",truckerSchema)

module.exports=truckerModel