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
  //const query = Meetings.find({}).select('title -_id');
  const query = Meetings.find({}).select('title');
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
  const { title, location, date, time, attendess, agendas,resolutions } = req.body;
 // console.log(resolutions);

  newMeetingSchema = new Meetings({
    title: title,
    location: location,
    date: date,
    time: time,
    attendess: attendess,
    agendas: agendas,
    resolutions: resolutions,
  });
  try {
    await newMeetingSchema.save().then((minutes) =>  res.json(minutes));
  } catch (err) {
    res.json(err);
  }
};

exports.getMeetingById = async(req, res) => {
  const objId = req.params.obj;
  const committeeName = req.params.id;
  const meeting = committeeName + "meetings";
  const Meetings = mongoose.model(meeting, meetingSchema);
  const query = Meetings.find({_id: objId});
  query.exec((err,data) => {
    if(err) {return res.status(404).json(err);}
    return res.json({data:data});
  })
}

exports.addResolution = async(req, res) => {
  const objId = req.params.obj;
  const committeeName = req.params.id;
  const meeting = committeeName + "meetings";
  const {resolutions} = req.body;
  const Meetings = mongoose.model(meeting, meetingSchema);
  Meetings.findById(objId).then((meeting) =>{
    for(let i = 0 ;i<resolutions.length ;i++){
       // console.log(resolutions[i]);
        meeting.resolutions.push(resolutions[i]);
    }
   meeting.save().then((response) => res.json({data:response}))
  }).catch((error) => res.json({error:error}))

}
