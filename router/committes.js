const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const committeesController = require("../controller/committeesController");


router.get("/test", committeesController.test);
router.get("/committees",authController.protected ,committeesController.getCommittees);
router.post("/addcommittee", committeesController.addCommittee);
router.delete("/deleteCommittee",committeesController.deleteCommittee);

module.exports = router;