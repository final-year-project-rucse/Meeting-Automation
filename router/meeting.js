const express = require("express");
const router = express.Router();

const meetingsController = require("../controller/meetingsController");


router.get("/:id/test", meetingsController.test);
router.get("/:id/meetings", meetingsController.getMeetings);
router.post("/:id/addMeeting", meetingsController.addMeeting);
router.get("/:id/meetings/:obj",meetingsController.getMeetingById);
router.post("/:id/meetings/:obj/addResolution",meetingsController.addResolution);
router.get("/:id/meetings/:obj/resolutions",meetingsController.resolutions);
router.delete("/:id/deleteMeeting",meetingsController.deleteMeetingById);
router.post("/:id/query",meetingsController.query);

module.exports = router;