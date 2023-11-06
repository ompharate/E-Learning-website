const mongoose = require("mongoose");
const teaSchema = new mongoose.Schema(
    {
        tea_name:{
            type:String,
            trim:true
        },
        tea_email:{
            type:String,
            trim:true
        },
        tea_exp:{
            type:Number,
            trim:true
        },
        tea_lang:{
            type:String,
            trim:true
        },
        tea_passwd:{
            type:String,
            trim:true
        },
    },
        { timestamps: true }
);



module.exports = mongoose.model("teaCollection",teaSchema);