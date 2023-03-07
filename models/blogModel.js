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
    content:{
        type:String,
        required:true
    }
  })

  const blogModel = mongoose.model("blogModel",blogSchema);
  module.exports=blogModel;

//   (async ()=>{
//     let blog={
//         title:"Good morning dharan",
//         author:"Admin",
//         content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed velit nibh. Sed eget elementum enim. Aliquam pulvinar maximus fringilla. Maecenas viverra purus id lorem ullamcorper convallis. Donec congue bibendum iaculis. Maecenas ac enim ultricies magna iaculis convallis imperdiet eu lectus. Mauris eleifend, arcu et ultricies euismod, quam tortor euismod ligula, ac gravida nisl lectus vel quam. Pellentesque non urna massa. Morbi fringilla libero a imperdiet sollicitudin. Cras porta est in nibh egestas, ac euismod ipsum lacinia. Donec mollis mollis cursus. Cras non bibendum odio, eu mattis enim. Suspendisse a mattis mauris. Proin vehicula faucibus odio, ac eleifend purus condimentum in. Vivamus elementum magna vel ante ornare tempus. Suspendisse id laoreet mauris, ac sollicitudin tortor./nUt sagittis et lectus non placerat. Aliquam in diam vel erat ultricies pretium ut et sapien. Suspendisse nisi elit, ullamcorper eu augue et, vehicula pulvinar turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur auctor hendrerit justo, et molestie tortor. Proin non efficitur ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean suscipit purus et orci bibendum egestas. Proin imperdiet quis tellus id dictum. Morbi sed venenatis metus. Proin tincidunt, urna eu volutpat semper, dui sem lacinia enim, sed laoreet enim eros quis urna. Aliquam maximus luctus ipsum eu ultricies. Pellentesque at nisi quis quam pretium cursus ut nec orci. In tristique facilisis mauris ac mollis. Ut at felis sit amet turpis feugiat fermentum./nDonec semper, tortor nec mattis consectetur, tortor magna ultrices tortor, id sodales nunc felis in erat. Nullam lectus lorem, dignissim vitae fringilla ac, faucibus vitae velit. Ut mauris lectus, dapibus ut accumsan a, congue ac urna. Quisque quis arcu ac ex accumsan congue. Cras pellentesque a elit eget bibendum. Phasellus aliquam magna urna, non sagittis erat sollicitudin nec. Suspendisse fringilla tortor a magna mattis volutpat. Fusce malesuada sit amet metus sed commodo. Duis a quam interdum, pretium sem ac, mollis erat. Pellentesque pellentesque aliquet nulla. Fusce fermentum posuere odio ut hendrerit. Suspendisse luctus, nisl eu semper mollis, nunc eros sollicitudin nibh, elementum viverra lorem orci in est./nMauris pellentesque lectus vitae est finibus ornare. Nunc finibus facilisis purus, vel facilisis elit. Morbi ut arcu nisi. Quisque nibh elit, luctus et auctor nec, varius consectetur ante. In hac habitasse platea dictumst. Donec efficitur mollis est. Praesent tincidunt tristique dapibus. Nullam diam turpis, lobortis et lacinia sed, varius eget enim. Curabitur vitae velit tincidunt, accumsan purus sit amet, mollis nunc./nVestibulum nec imperdiet eros. Vivamus eu eleifend urna. Mauris bibendum neque leo, lobortis convallis nulla facilisis ut. Curabitur fringilla consequat iaculis. In turpis sapien, euismod vel risus sollicitudin, posuere ultrices tortor. Proin maximus magna vitae ligula placerat, in sodales neque iaculis. Mauris sit amet ipsum efficitur, pretium sem eget, congue urna. Nulla lacinia mi eu magna maximus molestie. Etiam sit amet lorem luctus elit consectetur egestas. Etiam eu dui eu dui elementum vulputate. Vestibulum lacinia odio vel faucibus rutrum. Morbi in ex vulputate, vehicula ligula in, pharetra tellus. Suspendisse non luctus tellus, sit amet iaculis massa. Curabitur faucibus quam tincidunt risus dapibus, et porttitor ex porta."
//     }
//     console.log(await blogModel.create(blog))
//   })();

//   blogModel.findById("6407106bf610bd276ca8105e")
//   .then(article => {
//     const paragraphs = article.content.split('/n');
//     console.log("Paragraphs:", paragraphs);
//   })
//   .catch(error => {
//     console.error("Error retrieving article:", error);
//   });
