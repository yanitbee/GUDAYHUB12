const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const fs = require('fs');
const multer = require('multer');

const DataModel = require("./src/models/user")
const postModel = require("./src/models/post")
const ApplicantModel = require("./src/models/applicant")
const connectDB = require("./Database")
connectDB();

const app = express();
app.use(express.json({extended: false}))
app.use(express.static('public'));

const cors = require("cors")
app.use(cors());




app.get("/readfromserver", (req, res)=>{
    try{
    DataModel.find()
    .then(DataModel => res.json(DataModel))
    
    }catch (error){
        console.log("errorr", error.message)
        res.status(500).send("server error while reading data")

    }
})

//to read freelancer
app.get("/readfreelancer", (req, res)=>{
  try{
  DataModel.find()
  .then(DataModel => res.json(DataModel))
  
  }catch (error){
      console.log("errorr", error.message)
      res.status(500).send("server error while reading freelancer")

  }
})

//to write user
app.post("/writetodatabase", async (req, res)=>{
    try{
        const {Usertype, Fullname,username, Phonenumber, Email, Password, Gender,profilepic,title} = req.body;
        const newData = new DataModel({Usertype, Fullname,username, Phonenumber, Email, Password, Gender,profilepic,title})
        await newData.save();
        res.json({message: "data saved successfully"})

    }catch (error){
        console.log("errorrrrrrr", error.message)
        res.status(500).send("server error while saving data erorrrrrrrr")

    }
})

//to search user by username
app.get("/login/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const query ={username:username}
    const user = await DataModel.find(query);

    if (user.length === 0) {
      return res.status(404).json({ message: "freelancer not found" });
    }else{
    res.json(user);
    }
  } catch (error) {
    console.error("error checking user", error);
    res.status(500).json({ message: "Server error while reading freelancer" });
  }
});

//to write job

app.post("/writepost", async (req, res)=>{
    try{
        const { Jobtype, Jobtitle, Description, Qualification, PostedDate, Deadline, Salary, Contact, location, urgency, employer } = req.body;
        const newPost = new postModel({  Jobtype, Jobtitle, Description, Qualification, PostedDate, Deadline, Salary, Contact, location, urgency, employer })
        await newPost.save();
        res.json({message: "post saved successfully"})

    }catch (error){
        console.log("errorrrrrrr", error.message)
        res.status(500).send("server error while saving post erorrrrrrrr")

    }
})

//to read job

app.get("/readpost", (req, res)=>{
    try{
        postModel.find()
    .then(postModel => res.json(postModel))
    
    }catch (error){
        console.log("errorr", error.message)
        res.status(500).send("server error while reading post")

    }
})

//to serach job  with id

app.get("/search/:id", async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await postModel.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error reading post:", error);
      res.status(500).json({ message: "Server error while reading post" });
    }
  });

//to serach freelancer by id for applying

  app.get("/freelancerapply/:id", async (req, res) => {
    try {
      const freelancerid = req.params.id;
      const freelancer = await DataModel.findById(freelancerid);
      if (!freelancer) {
        return res.status(404).json({ message: "freelancer not found" });
      }
      res.json(freelancer);
    } catch (error) {
      console.error("Error reading post:", error);
      res.status(500).json({ message: "Server error while reading freelancer" });
    }
  });

  //to write applicant

  app.post("/writeapplicant", async (req, res)=>{
    try{
        const { Freelancerid, postid, Coverletter} = req.body;
        const newPost = new ApplicantModel({  Freelancerid, postid, Coverletter})
        await newPost.save();
        res.json({message: "applicant saved successfully"})

    }catch (error){
        console.log("errorrrrrrr", error.message)
        res.status(500).send("server error while saving applicant erorrrrrrrr")

    }
})

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'public', 'image');

if (!fs.existsSync(uploadDir)) {
  console.log(`Directory ${uploadDir} does not exist. Creating...`);
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`Directory ${uploadDir} created successfully.`);
} else {
  console.log(`Directory ${uploadDir} already exists.`);
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Save files to the 'public/image' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Save files with unique names
    console.log("l"+file)
  }
});

const upload = multer({ storage: storage });

//to edit profil pic for freelancer


app.put("/freelancerpicedit/:id", upload.single('file'), async (req, res) => {
  try {
    const freelancerid = req.params.id;
    const profilepic = req.file ? `image/${req.file.filename}` : null;

    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);
    console.log('Profile Picture Path:', profilepic);

    const filter = { _id: freelancerid };
    const update = { $set: { profilepic: profilepic} };
    const updatedFreelancer = await DataModel.findOneAndUpdate(filter, update,{ new: true });

    res.status(200).json(updatedFreelancer);
  } catch (error) {
    console.error("Error reading post:", error);
    res.status(500).json({ message: "Server error while editing freelancer" });
  }
});
//edit profile for freelancer

app.put("/freelanceredit/:id", upload.single('file'), async (req, res) => {
  try {
    const freelancerid = req.params.id;
    const {title} = req.body;
    const profilepic = req.file ? `image/${req.file.filename}` : null;

    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);
    console.log('Profile Picture Path:', profilepic);

    const filter = { _id: freelancerid };
    const update = { $set: { title: title , profilepic: profilepic} };
    const updatedFreelancer = await DataModel.findOneAndUpdate(filter, update,{ new: true });

    res.status(200).json(updatedFreelancer);
  } catch (error) {
    console.error("Error reading post:", error);
    res.status(500).json({ message: "Server error while editing freelancer" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`server is running on PORT: ${PORT}`);
})

//to edit profil pic for employer


app.put("/employerpicedit/:id", upload.single('file'), async (req, res) => {
  try {
    const employerid = req.params.id;
    const profilepic = req.file ? `image/${req.file.filename}` : null;

    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);
    console.log('Profile Picture Path:', profilepic);

    const filter = { _id: employerid };
    const update = { $set: { profilepic: profilepic} };
    const updatedEmployer = await DataModel.findOneAndUpdate(filter, update,{ new: true });

    res.status(200).json(updatedEmployer);
  } catch (error) {
    console.error("Error reading post:", error);
    res.status(500).json({ message: "Server error while editing employer" });
  }
});
//edit profile for employer

app.put("/employeredit/:id", upload.single('file'), async (req, res) => {
  try {
    const employerid = req.params.id;
    const {title} = req.body;
    const profilepic = req.file ? `image/${req.file.filename}` : null;

    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);
    console.log('Profile Picture Path:', profilepic);

    const filter = { _id: employerid };
    const update = { $set: { title: title , profilepic: profilepic} };
    const updatedEmployer = await DataModel.findOneAndUpdate(filter, update,{ new: true });

    res.status(200).json(updatedEmployer);
  } catch (error) {
    console.error("Error reading post:", error);
    res.status(500).json({ message: "Server error while editing employer" });
  }
});