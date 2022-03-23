const express = require("express");
const router = express.Router();

const headController = require("../controller/headController");

router.post("/headreg", headController.register);
router.post("/headin", headController.signIn);

module.exports = router;
