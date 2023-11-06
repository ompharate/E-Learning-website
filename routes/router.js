const express =  require("express");
const router = express.Router();
const stuController = require("../controller/stuController");
const teaController = require("../controller/teaController");
const lecController = require("../controller/lecController");
const adminController = require("../controller/adminController");
const upperController = require("../controller/upperController");
const middleWare = require("../middleware/auth")
router.get('/',upperController.home_page);
router.get('/home',upperController.home_page);
router.post('/msgcontact',upperController.contact)

router.get('/tea_login',(req,res)=>{res.render("tea_login")})
router.get('/stu_login',(req,res)=>{res.render("stu_login")})
router.get('/about',(req,res)=>{res.render("about")})
router.get('/contact',(req,res)=>{res.render("contact")})
router.get('/upload',(req,res)=>{res.render("lectureupload")})
router.get('/logins',(req,res)=>{res.render("loginareas")})
router.get('/adminlogin',(req,res)=>{res.render("adminlogin")})
router.get('/tea_registeration',(req,res)=>{res.render("tea_registeration")})
router.get('/admin_dashboard',adminController.admin_dashboard)
router.get('/admin/qureys',adminController.get_querys)

router.get('/admin/addstudents',(req,res)=>{res.render("addstudents")})
router.get('/admin/delete/students/:id',adminController.delete_student)
router.get('/admin/delete/teachers/:id',adminController.delete_teacher)

router.post('/auth/sturegister',stuController.register_stu);
router.post('/auth/tearegister',teaController.register_tea);
router.post('/auth/tealogin',teaController.tea_login);
router.post('/auth/stulogin',stuController.stu_login);
router.post('/auth/adminlogin',adminController.admin_login);

router.get('/leaderboard',upperController.leaderboard);
router.get('/logout',upperController.logout);
router.post('/admin/addstudet/action',adminController.add_students);
router.get('/teadashboard',middleWare.authentication,teaController.tea_dashboard);
router.get('/studashboard',middleWare.authentication,stuController.stu_dashboard);
router.get('/teaprofile',teaController.tea_profile);
router.get('/stuprofile',stuController.stu_profile);
router.get('/stuprofiletea/:id',stuController.stu_profile_tea);

router.post('/uploadlec',teaController.tea_upload_lec);
router.get('/delete/:id',teaController.delete_lec);
router.get('/practice/:lang/:id',lecController.practice_editor_loader);
router.get('/ansreview/:lang',lecController.ans_review);
router.post('/accepte',lecController.code_accepte);
router.post('/delete',lecController.code_delete);
router.post('/submit',lecController.code_submiter);
router.get('/class/:lang/:count',lecController.lecture_loader);
module.exports = router;