const express = require("express");
const router = express.Router();

const headController = require("../controller/HeadController");

router.post("/headreg", headController.register);
router.post("/headin", headController.signIn);
router.get("/committees", headController.getCommittees);

module.exports = router;
