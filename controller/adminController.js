const stuModule = require("../models/studentModule");
const conModule = require("../models/contactModule");
const teaModule = require("../models/teacherModule");
const lecModule = require("../models/lectureModule");
const admin_login = async function(req,res){        
    let email = req.body.email
    let password = req.body.password
    
    if(email=="admin@gmail.com" && password == "123"){
        res.redirect("/admin_dashboard")
    }else{        
        res.redirect("/adminlogin")
    }

}   
const add_students = async function(req,res){    
    
    let data  = req.body 
    
    
    let existingStudent = await stuModule.findOne({ stu_sr: data.stu_sr});
    console.log(existingStudent)
    
   
    if (!existingStudent) {
       
        let saveData = await stuModule.create(data)
        res.redirect("/admin_dashboard")
      
    }else{ 
            

        res.redirect("/admin_dashboard")
    }

}   

const admin_dashboard = async function(req,res){    
    let data1 = await stuModule.find()
    let data2 = await teaModule.find()
    res.render("admin_dashboard",{data1:data1,data2:data2})
    
}   
const delete_student = async function(req,res){    

    id = req.params.id
    let saveData = await stuModule.deleteOne({_id:id})
    res.redirect("/admin_dashboard")

}
    
 
const delete_teacher = async function(req,res){    

    
    let id = req.params.id
    let saveData = await teaModule.deleteOne({_id:id})
    res.redirect("/admin_dashboard")

}
const get_querys = async function(req,res){    

    let data = await conModule.find();
    res.render("adminquerys",{data:data})

} 

module.exports = {admin_login,add_students,admin_dashboard,delete_student,delete_teacher,get_querys};

