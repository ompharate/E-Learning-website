const conModule = require("../models/contactModule");
const ansModule = require("../models/answersModule");
const jwt = require("jsonwebtoken");
const studentModule = require("../models/studentModule");
const contact = async function(req,res){

    
    let data = req.body;
    
    let saveData = await conModule.create(data)
    res.redirect("/contact")
}

const leaderboard = async function(req,res){

        let data = await studentModule.find().sort({ stu_rank: -1 })
        console.log(data)
        res.render("leaderboard",{data:data})
    
  
}
const home_page = async function(req,res){
    res.render("home")
  
}
const logout = async function(req,res){
    res.clearCookie('jwt');
    res.clearCookie('isTeacher');
    res.redirect("/")
}

module.exports = {home_page,contact,leaderboard,logout};