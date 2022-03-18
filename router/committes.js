const express = require("express");
const router = express.Router();

const committeesController = require("../controller/committeesController");


router.get("/test", committeesController.test);
router.get("/committees", committeesController.getCommittees);
router.post("/addcommittee", committeesController.addCommittee);


module.exports = router;