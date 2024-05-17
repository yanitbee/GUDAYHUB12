const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

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
app.post("/writetodatabase", async (req, res)=>{
    try{
        const {content, Usertype, Fullname, Phonenumber, Email, Password, Gender} = req.body;
        const newData = new DataModel({content, Usertype, Fullname, Phonenumber, Email, Password, Gender})
        await newData.save();
        res.json({message: "data saved successfully"})

    }catch (error){
        console.log("errorrrrrrr", error.message)
        res.status(500).send("server error while saving data erorrrrrrrr")

    }
})

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

app.get("/readpost", (req, res)=>{
    try{
        postModel.find()
    .then(postModel => res.json(postModel))
    
    }catch (error){
        console.log("errorr", error.message)
        res.status(500).send("server error while reading post")

    }
})


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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`server is running on PORT: ${PORT}`);
})