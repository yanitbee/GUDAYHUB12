const { type } = require("@testing-library/user-event/dist/type");
const { Double, Int32 } = require("mongodb");
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    profilepic: { type: String, },
    title: { type: String, },

  }, { _id: false });

const DataSchema = new mongoose.Schema({
    Usertype:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    Fullname:{
        type: String,
        required: true
    },
    Phonenumber:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    },
    Gender:{
        type: String,
        required: true
    },
    profilepic:{
        type: String,
    },
    title:{
        type: String,
    },
    freelancerprofile:{
        profilepic: { type: String,default: null },
         title: { type: String, default: null},
        skills:{type: [String],default: []},
        cv:{type: String, default: null},
        additionaldoc:{educations : { type: [String],default: [] },
                    certifications: { type: [String], default: []},},
        gudayhistory:{type:[String],default: []},
        workhistory:{type:[String],default: []},
        rating:{type:String, default: null},
        description:{type:String, default: null},
        portfolio:{link: { type: String, default: null},
                     title: { type: String, default: null},},

    },
});
module.exports = mongoose.model("users", DataSchema);