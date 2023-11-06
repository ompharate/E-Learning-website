const stuModule = require("../models/studentModule");
const teaModule = require("../models/teacherModule");
const lecModule = require("../models/lectureModule");
const validator = require("../validations/validation");
const jwt = require("jsonwebtoken");
const register_tea = async function(req,res){

    let data = req.body;
    
    // let tea_name = data.name;
    // let tea_lang = data.lang;
    // let tea_exp =data.exp;
    // let tea_passwd = data.passwd;

    // if(validator.isValidName(tea_name) && validator.isValidateExperiance(tea_exp)){res.send("ok");}else{
    //     if(!validator.isValidName(tea_name) && !validator.isValidateExperiance(tea_exp)){  return res.status(400).send({status:false, message: "Please Enter valid name & experiance" })}
    //     if(!validator.isValidName(tea_name)){  return res.status(400).send({status:false, message: "Please Enter Valid Name" })}
    //     if(!validator.isValidateExperiance(tea_exp)){return res.status(400).send({status:false, message: "Please Enter a Valid Experiance" })}
    //  }   
    
    let saveData = await teaModule.create(data)
    res.redirect("/tea_login")

}
const tea_login = async function(req,res){

    let data = req.body;
    let tea_email = data.tea_email;
    let tea_passwd = data.tea_passwd;

    
    let tea_Verify = await teaModule.findOne({ tea_email: tea_email})
        try {
            
      
    if(tea_Verify.tea_passwd!=tea_passwd){
        
       res.redirect("/tea_login")
    }else{
        
        if (!tea_Verify) {
            res.redirect("/tea_login")
            
        } else {
            
            let token = jwt.sign({ userId: tea_Verify._id.toString() }, "ompharate11");
            res.cookie("jwt", token)
            res.cookie("isTeacher",true)
            
                    res.redirect("/teadashboard")
               
            }
    }

} catch (error) {
    res.redirect("/tea_login") 
}
}
const tea_dashboard = async function(req,res){

    let token = req.cookies.jwt;
    let decodedToken = jwt.verify(token, "ompharate11");
    var userId = decodedToken.userId
    let documentCount;
    let data1 = await teaModule.findOne({ _id: userId })
     let data2 = await lecModule.find({tea_id: userId}).sort({$natural:-1})
    let data3 =await stuModule.find({})

    res.render("tea_dashboard",{data1:data1,data2:data2,data3:data3})
    
}

const tea_profile= async function(req,res){   
    let token = req.cookies.jwt;
    let decodedToken = jwt.verify(token, "ompharate11");
    var userId = decodedToken.userId
    let data = await teaModule.findOne({ _id: userId })
    let isTeacher = true
    res.render("profile",{data:data,isTeacher})
    
}
const tea_upload_lec= async function(req,res){   
    
    let token = req.cookies.jwt;
    let decodedToken = jwt.verify(token, "ompharate11");
    var userId = decodedToken.userId
    
    let finalLink = req.body.topic_link.split("=")
   
   
    data = {
        topic_name:req.body.topic_name,
        topic_link:finalLink[1],
        topic_lang:req.body.topic_lang,
        topic_ques:req.body.topic_ques,
        tea_id:userId,
    }
 
    let saveData = await lecModule.create(data)
    res.redirect("/teadashboard")
    
} 
const delete_lec= async function(req,res){   
    
    id = req.params.id
   
    let saveData = await lecModule.deleteOne({_id:id})
    res.redirect("/teadashboard")


}
module.exports = {register_tea,tea_login,tea_dashboard,tea_profile,tea_upload_lec,delete_lec};
