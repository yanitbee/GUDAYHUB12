const { type } = require("@testing-library/user-event/dist/type");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const ApplicantSchema = new mongoose.Schema({
    Freelancerid:{
        type: ObjectId,
        required: true
    },
    postid:{
        type: ObjectId,
        required: true
    },
    Coverletter:{
        type: String,
    },
    
});
module.exports = mongoose.model("applicant", ApplicantSchema);