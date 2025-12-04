const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    path:{
        type:String,
        required:[true,"File path is required"]
    },
    originalName:{
        type:String,
        required:[true,"Original name is required"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userdatas",
        required:[true,"User ID is required"]
    },
    resourceType: {
       type: String
}

})   

const File = mongoose.model("filedata",fileSchema);

module.exports = File;