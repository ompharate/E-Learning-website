const mongoose = require("mongoose");
const ansSchema = new mongoose.Schema(
    {
        topic_lang:{
            type:String,
            trim:true
        },
        topic_id:{
            type:String,
            trim:true
        },
        stu_id:{
            type:String,
            trim:true
        },
        accepted:{
            type:Number,
            default: 0,
            trim:true
        },
        topic_content:{
            type:String,
            trim:true

        }
    },
        { timestamps: true }
);



module.exports = mongoose.model("ansCollection",ansSchema);