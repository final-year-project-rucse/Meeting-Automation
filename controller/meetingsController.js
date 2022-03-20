const meetingSchema = require("../model/meetings");
const passport = require("passport");
const mongoose = require("mongoose");

//const validatePostInput = require("../validation/members");

exports.test = (req, res) => {
  return res.json({
    success: true,
    data: "test",
  });
};

exports.getMeetings = (req, res) => {
  const committeeName = req.params.id;
  const meeting = committeeName + "meetings";
  const Meetings = mongoose.model(meeting, meetingSchema);
  const query = Meetings.find({}).select('title -_id');
  query.exec((err, datas) => {
    if(err){
      return res.json(err);
    }
    return res.json({
      data: datas
    })

  })

};

exports.addMeeting = async (req, res) => {
  const committeeName = req.params.id;
  const meeting = committeeName + "meetings";

  const Meetings = mongoose.model(meeting, meetingSchema);
  const { title, location, date, time, attendess, agendas } = req.body;

  newMeetingSchema = new Meetings({
    title: title,
    location: location,
    date: date,
    time: time,
    attendess: attendess,
    agendas: agendas,
  });
  try {
    await newMeetingSchema.save().then((minutes) =>  res.json(minutes));
  } catch (err) {
    res.json(err);
  }
};
