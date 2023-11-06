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
