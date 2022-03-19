const express = require("express");
const router = express.Router();

const minutesController = require("../controller/minutesController");


router.get("/:id/test", minutesController.test);
// router.get('/:id',membersController.getMembers);
// router.post('/:id',membersController.addMembers);



module.exports = router;