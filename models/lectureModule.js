const mongoose = require("mongoose");
const LecSchema = new mongoose.Schema(
    {
        topic_name:{
            type:String,
            trim:true
        },
        topic_link:{
            type:String,
            trim:true
        },
        topic_lang:{
            type:String,
            trim:true
        },
        topic_ques:{
            type:String,
            trim:true
        },
        tea_id:{
            type:String,
            trim:true
        },

    },
        { timestamps: true }
);



module.exports = mongoose.model("lecCollection",LecSchema);