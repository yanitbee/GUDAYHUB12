const { type } = require("@testing-library/user-event/dist/type");
const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    Usertype:{
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
    }
});
module.exports = mongoose.model("DataModel", DataSchema);