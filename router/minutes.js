const express = require("express");
const router = express.Router();

const minutesController = require("../controller/minutesController");


router.get("/:id/test", minutesController.test);
router.get("/:id/meetings", minutesController.getMeetings);
router.post("/:id/addMeeting", minutesController.addMeeting);
// router.get('/:id',membersController.getMembers);
// router.post('/:id',membersController.addMembers);



module.exports = router;