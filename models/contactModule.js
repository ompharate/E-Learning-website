const mongoose = require("mongoose");
const conSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            trim:true
        },
        msg:{
            type:String,
            trim:true
        },     

    },
        { timestamps: true }
);



module.exports = mongoose.model("conCollection",conSchema);