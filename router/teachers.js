const express = require("express");
const router = express.Router();

const teachersController = require("../controller/teachersController");


router.get("/teacher/test", teachersController.test);
router.get('/admin/teachers',teachersController.getTeachers);
router.post('/admin/addteacher',teachersController.addTeacher);
router.delete('/admin/deleteteacher',teachersController.delteTeacher);



module.exports = router;