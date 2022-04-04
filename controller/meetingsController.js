const meetingSchema = require("../model/meetings");
const passport = require("passport");
const mongoose = require("mongoose");
const membersSchema = require("../model/members");
//const validatePostInput = require("../validation/members");
const sendMail = require("../utils/emailSend");

function getMembers(model) {
  return new Promise((resolve, reject) => {
    const Members = mongoose.model(model, membersSchema);
    resolve(
      Members.find({})
        .then((result) => {
          return result;
        })
        .catch((err) => {
          return false;
        })
    );
  });
}

exports.test = (req, res) => {
  return res.json({
    success: true,
    data: "test",
  });
};

exports.getMeetings = async (req, res) => {
  const committeeName = req.params.id;

  const meeting = committeeName + "meetings";
  const Meetings = mongoose.model(meeting, meetingSchema);
  //const query = Meetings.find({}).select('title -_id');
  const query = Meetings.find({}).select("title");
  query.exec((err, datas) => {
    if (err) {
      return res.json(err);
    }
    return res.json({
      data: datas,
    });
  });
};

exports.addMeeting = async (req, res) => {
  const committeeName = req.params.id;
  const meeting = committeeName + "meetings";

  const all = await getMembers(committeeName);
  // console.log("all", all);
  // console.log("ok");

  const Meetings = mongoose.model(meeting, meetingSchema);
  const { title, location, date, time, agendas, resolutions } = req.body;
  let text = "";
  let i = 0;

  // console.log(resolutions);
  let attendess = [];
  let receivers = "";
  if (all.length > 0) {
    for (let i = 0; i < all.length; i++) {
      const data = {
        name: all[i].name,
        email: all[i].email,
      };
      attendess.push(data);
      if (i < all.length - 1) {
        receivers = receivers + all[i].email + ",";
      } else {
        receivers = receivers + all[i].email;
      }
    }
  }
  console.log(attendess);
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
    const mailOptions = {
      to: receivers,
      subject: "invitation",
      html: `<div>
          <div>
            <h4> a Meeting</h4>
          </div>
          <div>
            <p>
              <strong>Title :</strong>${title}
            </p>
          </div>
          <div>
            <p>
              <strong>Location :</strong>${location}
            </p>
          </div>
          <div>
            <p>
              <strong>Date :</strong>${date}
            </p>
          </div>
          <div>
            <p>
              <strong>Time :</strong>${time}
            </p>
          </div>
          <div>
            <p>
              <strong>Location :</strong>${location}
            </p>
          </div>
          <div>
            ${text}
          </div>
          <div></div>
          <div>
            please go to this <a href="#">link</a> and take neccessary action.
          </div>
        </div>`,
    };
    console.log(receivers);
    await newMeetingSchema.save().then((minutes) => {
      const mail = sendMail(mailOptions);
      res.json({
        mail: mail,
        data: minutes,
      });
    });
  } catch (err) {
    res.json(err);
  }
};

exports.getMeetingById = async (req, res) => {
  const objId = req.params.obj;
  const committeeName = req.params.id;
  const meeting = committeeName + "meetings";
  const Meetings = mongoose.model(meeting, meetingSchema);
  const query = Meetings.find({ _id: objId });
  query.exec((err, data) => {
    if (err) {
      return res.status(404).json(err);
    }
    return res.json({ data: data });
  });
};

exports.deleteMeetingById = async (req, res) => {
  const { id } = req.body;
  const committeeName = req.params.id;
  const meeting = committeeName + "meetings";
  const Meetings = mongoose.model(meeting, meetingSchema);
  try {
    const response = await Meetings.deleteOne({ _id: id });
    res.status(200).json({ success: true, data: response });
  } catch (err) {
    res.status(400).json({ success: false, data: err });
  }
};

exports.addResolution = async (req, res) => {
  const objId = req.params.obj;
  const committeeName = req.params.id;
  const meeting = committeeName + "meetings";
  const { resolutions } = req.body;
  console.log(resolutions);
  const Meetings = mongoose.model(meeting, meetingSchema);
  Meetings.findById(objId)
    .then((meeting) => {
      console.log(meeting);
      for (let i = 0; i < resolutions.length; i++) {
        // console.log(resolutions[i]);
        meeting.resolutions.push(resolutions[i]);
      }
      meeting.save().then((response) => res.json({ data: response }));
    })
    .catch((error) => res.json({ error: error }));
};

exports.resolutions = async (req, res) => {
  const objId = req.params.obj;
  const committeeName = req.params.id;
  const meeting = committeeName + "meetings";
  const { resolutions } = req.body;
  const Meetings = mongoose.model(meeting, meetingSchema);
  Meetings.findById(objId)
    .then((meeting) => {
      res.json({ data: meeting.resolutions });
    })
    .catch((error) => res.json({ error: error }));
};
