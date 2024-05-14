require("dotenv").config();
const mongoose = require("mongoose")
const uri = process.env.SERVER_MONGODB_URI;

const connectDB = async () =>{

    try{

        await mongoose.connect(uri);
        console.log("success, mongodb connected")
    }catch(error){
        console.log("fail, mongodb error", error.message)
    }

}

module.exports = connectDB;