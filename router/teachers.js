const express = require("express");
const router = express.Router();

const teachersController = require("../controller/teachersController");


router.get("/teacher/test", teachersController.test);
router.get('/admin/teachers',teachersController.getTeachers);
router.post('/admin/addteacher',teachersController.addTeacher);



module.exports = router;