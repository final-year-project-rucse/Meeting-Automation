const minutesSchema = require("../model/minutes");
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
  const Meetings = mongoose.model(meeting, minutesSchema);
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

  const Meetings = mongoose.model(meeting, minutesSchema);
  const { title, location, date, time, attendess, agendas } = req.body;

  newMinutesSchema = new Meetings({
    title: title,
    location: location,
    date: date,
    time: time,
    attendess: attendess,
    agendas: agendas,
  });
  try {
    await newMinutesSchema.save().then((minutes) =>  res.json(minutes));
  } catch (err) {
    res.json(err);
  }
};
