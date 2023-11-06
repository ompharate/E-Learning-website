const stuModule = require("../models/studentModule");
const teaModule = require("../models/teacherModule");
const lecModule = require("../models/lectureModule");
const ansModule = require("../models/answersModule");
const jwt = require("jsonwebtoken");
const lecture_loader = async function(req,res){   
    
    let data = await lecModule.find({topic_lang:req.params.lang})
    let id = req.params.count;
    let isTeacher = req.cookies.isTeacher;

    let player = data[id]
    console.log(typeof(isTeacher))
    res.render("learningpage",{data:data,player:player,id,isTeacher});    

}
const practice_editor_loader = async function(req,res){   
    let token = req.cookies.jwt;
    let isTeacher = req.cookies.isTeacher;
    let decodedToken = jwt.verify(token, "ompharate11");
    var userId = decodedToken.userId
 
    let data = await lecModule.find({topic_lang:req.params.lang})
    let id =  req.params.id;
    let data1 = await lecModule.findOne({_id:id})
    let data2 = await ansModule.find({stu_id:userId,topic_lang:req.params.lang})
   
   console.log("is Teacher is:",isTeacher)
   
    // console.log(data)
    res.render("practice",{data:data,data1:data1,data2:data2,id,isTeacher});      
}
const code_submiter = async function(req,res){   
     
    
    let token = req.cookies.jwt;
    let decodedToken = jwt.verify(token, "ompharate11");
    var userId = decodedToken.userId
   try{
    
    data = {
        topic_lang:req.body.topic_lang,
        topic_id:req.body.topic_id,
        stu_id:userId,
        topic_content:req.body.content,
    }
    console.log(data)

    let verify = await ansModule.findOne({topic_id:req.body.topic_id,stu_id:userId})
    console.log("verify",verify)
    if(!verify){
        console.log("new created")
        
        let saveData = await ansModule.create(data)
        
        
           

    }else{
        
        console.log("updated")
        let verify = await ansModule.findOneAndUpdate({topic_id:req.body.topic_id},{topic_content:req.body.content})
    }

    res.send({success:"Done"})     
    
}catch{
    res.send({success:"Error"})     

}
}
const ans_review = async function(req,res){   
    
    let data = await ansModule.find({topic_lang:req.params.lang,accepted:0})

    console.log(data)

    res.render("ansreview",{data:data})
}
const code_accepte = async function(req,res){
 
    let stuid = req.body.stu_id;
    let id = req.body.id;
    console.log("this is id",id)
    console.log(stuid)
    let updatedData = await stuModule.findOneAndUpdate({_id:stuid},{$inc:{stu_rank:1}})   
    let updatedData1 = await ansModule.findOneAndUpdate({_id:id},{$set: {accepted: 1}})   

    console.log("done accept")
    res.send({success:"Done"}) 
    
}
const code_delete = async function(req,res){
    
    let id = req.body.id;
    console.log(id)
    console.log("done reject")
    let updatedData = await ansModule.findOneAndDelete({_id:id})   

    res.send({success:"Done"}) 
    
}
module.exports = {lecture_loader,practice_editor_loader,code_submiter,ans_review,code_accepte,code_delete};

