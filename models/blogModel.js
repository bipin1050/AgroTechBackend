const mongoose = require("mongoose");
const db_link =
  "mongodb+srv://admin:0PebVC1tNiGV6XrJ@cluster0.qipytgs.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db_link)
  .then(function (db) {
    // console.log(db);
    console.log("blogs db connected");
  })
  .catch(function (err) {
    console.log(err);
  });

  const blogSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    publicationDate:{
        type:Date,
        default:Date()
    },
    highlights:{
        type:String,
        required:true
    },
    content:{
        type:[String],
        required:true
    },
    image:{
      type:String,
      
    }
  })

  const blogModel = mongoose.model("blogModel",blogSchema);
  module.exports=blogModel;

  // (async ()=>{
  //   let blog={
  //       title:"Good morning dharan",
  //       author:"Admin",
  //       content:['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in vulputate augue, ut consequat arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce sit amet risus dui. Phasellus laoreet risus sed tincidunt mollis. Aenean non dui vel augue pulvinar viverra. Nulla facilisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean bibendum metus in pellentesque laoreet. ','Mauris rutrum, orci sed iaculis vestibulum, neque lorem hendrerit est, vitae malesuada turpis nisl ac erat. Pellentesque blandit nisi arcu, vestibulum auctor magna pulvinar sed. Cras eu laoreet magna. Vivamus pharetra lacus quis tellus elementum, in volutpat quam luctus. Pellentesque eu commodo orci, ut dapibus orci. Etiam sollicitudin elit ac sodales lacinia. Donec neque nisi, suscipit imperdiet tellus eu, facilisis mattis sapien. Praesent in ex eget ligula ultrices sodales. Donec justo purus, consequat ut dui sed, mattis venenatis nisi. Proin varius maximus metus, vel sagittis odio dignissim molestie. Ut lacinia non ante at efficitur. ','Nullam ut velit fringilla, rutrum augue in, pellentesque metus. Nam non leo in massa lacinia elementum. Pellentesque nisi dolor, fringilla in nisi vel, varius finibus est. Nulla feugiat lectus justo. Praesent dignissim aliquam tortor nec facilisis. Vivamus imperdiet ultricies ornare. Nulla euismod consectetur gravida. Sed at magna ac massa pellentesque rhoncus id viverra leo. Ut congue ac enim a porta. Mauris neque erat, ultricies eget arcu eu, consequat consectetur risus. Donec id mi gravida, tempus purus a, eleifend enim. Vivamus dictum est turpis, sed feugiat quam varius a. ','Donec consectetur eros libero, id ullamcorper eros auctor ac. Morbi accumsan dui venenatis placerat congue. Nullam at dapibus justo, eget pharetra justo. Nunc tempor fermentum neque eu lacinia. Curabitur consectetur mauris dolor, quis mollis nulla sollicitudin quis. Phasellus nec lobortis dui. In hac habitasse platea dictumst. ','Pellentesque ullamcorper felis in erat imperdiet maximus. Sed vel lectus eget tortor euismod ornare quis a libero. Sed massa magna, fermentum a neque volutpat, aliquet tempus elit. Curabitur non tempus tellus. Integer maximus nibh vitae nisi accumsan ultrices. Donec justo turpis, commodo nec aliquam quis, eleifend sit amet mauris. Sed convallis lobortis risus ullamcorper pretium. Vivamus ut sapien vitae nisi egestas lacinia in in purus. Pellentesque nec lacus laoreet, aliquet est eget, tristique ipsum. Praesent iaculis quam eget orci efficitur, in faucibus dui ultricies.']
  //   }
  //   console.log(await blogModel.create(blog))
  // })();

  // blogModel.findById("64080ecda856a68b0bc00e65")
  // .then(article => {
  //   console.log("Paragraphs:", article);
  // })
  // .catch(error => {
  //   console.error("Error retrieving article:", error);
  // });
