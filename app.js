

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fs = require('fs');
const mongoose = require('mongoose');


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));


let postArray =[];

mongoose.connect("mongodb+srv://parthsarkar25:Sarkar12@cluster0.g2diysm.mongodb.net/posts",{useNewUrlParser: true});
// mongoose.set('strictQuery', true);
const itemsSchema={
    title: String,
    content:String
}
const Item =mongoose.model("Item",itemsSchema);



app.get("/",function(req,res){
  res.render("home", {hsc:homeStartingContent, posts:postArray});
}); 

app.get("/about",function(req,res){
  res.render("about",{ac:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact" , {cc:contactContent});
});  

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  // const post={
  //   title: req.body.postTitle,
  //   content : req.body.postBody
  // };
  const item = new Item({
    title: req.body.postTitle,
    content : req.body.postBody
    });
    item.save();
    postArray.push(item);
    res.redirect("/");

  // postArray.push(post);
  // res.redirect("/");
});

// Autosave endpoint
app.post('/autosave', (req, res) => {
  const formData =req.body

  // Save the form data to a file
  fs.writeFile('autosave.json', JSON.stringify(formData), (err) => {
    if (err) {
      console.error('Error saving form data:', err);
      res.status(500).send('Error saving form data');
    } else {
      console.log('Form data saved successfully');
      res.status(200).send('Form data saved successfully');
    }
  });
});

// Route to retrieve autosaved form data
app.get('/autosave', (req, res) => {
  fs.readFile('autosave.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error retrieving form data:', err);
      res.status(500).send('Error retrieving form data');
    } else {
      const formData = JSON.parse(data);
      res.status(200).json(formData);
    }
  });
});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});

