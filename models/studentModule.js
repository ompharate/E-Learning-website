const mongoose = require("mongoose");
const StuSchema = new mongoose.Schema(
    {
        stu_sr:{
            type:String,
            trim:true
        },
        stu_name:{
            type:String,
            trim:true
        },
        stu_email:{
            type:String,
            trim:true
        },
        stu_passwd:{
            type:String,
            trim:true
        },
        stu_rank:{
            type:Number,
            trim:true
        },
    },
        { timestamps: true }
);



module.exports = mongoose.model("stuCollection",StuSchema);