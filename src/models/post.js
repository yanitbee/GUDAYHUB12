const { type } = require("@testing-library/user-event/dist/type");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    _id:{
        type: ObjectId,
    },
    Jobtype:{
        type: String,
        required: true
    },
    Jobtitle:{
        type: String,
        required: true
    },
    Description:{
        type: String,
    },
    Qualification:{
        type: String,
    },
    PostedDate:{
        type: String,
        required: true
    },  
    Deadline:{
        type: String,
        required: true
    },  
    Salary:{
        type: String,
        required: true
    },
    Contact:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    urgency:{
        type: Boolean,
        required: true
    },
    employer:{
        type:String
    } 
});
module.exports = mongoose.model("post", PostSchema);