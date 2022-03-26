const express = require("express");
const router = express.Router();

const membersController = require("../controller/membersController");


router.get("/member/test", membersController.test);
router.get('/:id',membersController.getMembers);
router.post('/:id/addMembers',membersController.addMembers);
router.delete("/:id/deleteMember",membersController.deleteMember)



module.exports = router;