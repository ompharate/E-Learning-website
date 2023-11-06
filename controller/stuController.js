const stuModule = require("../models/studentModule");
const teaModule = require("../models/teacherModule");
const lecModule = require("../models/lectureModule");
const validator = require("../validations/validation");
const jwt = require("jsonwebtoken");
const register_stu = async function (req, res) {

    let data = req.body;
    let stu_name = data.stu_name;
    let stu_email = data.stu_email;
    let stu_class = data.stu_class;
    let stu_passwd = data.stu_passwd;

    if (!validator.isValidName(stu_name) && !validator.isValidateEmail(stu_email)) { return res.status(400).send({ status: false, message: "Please Enter valid name & email" }) }
    if (!validator.isValidName(stu_name)) { return res.status(400).send({ status: false, message: "Please Enter Valid Name" }) }
    if (!validator.isValidateEmail(stu_email)) { return res.status(400).send({ status: false, message: "Please Enter a Valid Email" }) }


    let saveData = await stuModule.create(data)
    res.send(saveData);

}
const stu_login = async function (req, res) {

    let data = req.body;
    let stu_email = data.stu_email;
    let stu_passwd = data.stu_passwd;


    let stu_Verify = await stuModule.findOne({ stu_email: stu_email })

    try {
        
    
    if (stu_Verify.stu_passwd != stu_passwd) {
        res.redirect("/stu_login")
        
    } else {
        
        if (!stu_Verify) {
            res.redirect("/stu_login")
      
        } else {
            let token = jwt.sign({ userId: stu_Verify._id.toString() }, "ompharate11");
            res.cookie("jwt", token)
            res.cookie("isTeacher",false)
            res.redirect("/studashboard")

        }

    }

} catch (error) {
    res.redirect("/stu_login")
}
}

const stu_dashboard = async function (req, res) {

    let token = req.cookies.jwt;
    let decodedToken = jwt.verify(token, "ompharate11");
    var userId = decodedToken.userId
  
    let data1 = await stuModule.findOne({ _id: userId })
    let data2 = await teaModule.find()
   


    res.render("student_dashboard",{data1:data1,data2:data2})

}
const stu_profile= async function(req,res){   
    let token = req.cookies.jwt;
    let decodedToken = jwt.verify(token, "ompharate11");
    var userId = decodedToken.userId
    let data = await stuModule.findOne({ _id: userId })
    let isTeacher = false
    res.render("profile",{data:data,isTeacher})
    
}
const stu_profile_tea= async function(req,res){   
    let userId = req.params.id
    let data = await stuModule.findOne({ _id: userId })
    let isTeacher = false
    res.render("profile",{data:data,isTeacher})
    
}
module.exports = { register_stu, stu_login, stu_dashboard,stu_profile,stu_profile_tea };