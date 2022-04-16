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
  const query = Meetings.find({}).select("title time date location");
  query.exec((err, datas) => {
    if (err) {
      return res.json(err);
    }
    return res.json({
      data: datas.reverse(),
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
  //console.log(attendess);
  newMeetingSchema = new Meetings({
    title: title,
    location: location,
    date: date,
    time: time,
    attendess: attendess,
    agendas: agendas,
    resolutions: resolutions,
  });
  var slides = [];
  for (let i = 0; i < agendas.length; i++) {
    slides.push(agendas[i].text);
  }
  var str = "<ul>";

  slides.forEach(function (slide) {
    str += "<li>" + slide + "</li>";
  });

  str += "</ul>";
  //document.getElementById("slideContainer").innerHTML = str;
  try {
    const mailOptions = {
      to: receivers,
      subject: "invitation",
      html: `<div>
          <div>
            <h4>you are invited in this meeting.Please attend in time</h4>
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
         <div><strong>Agendas:</strong></div>
          <div >${str}</div>
          <div>
            please go to this <a href="#">link</a> and take neccessary action.
          </div>
        </div>`,
    };
    //console.log(receivers);
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
  const all = await getMembers(committeeName);
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
  Meetings.findById(objId)
    .then((meeting) => {
      console.log(meeting);
      var str = "<ul>";
      for (let i = 0; i < resolutions.length; i++) {
        // console.log(resolutions[i]);
        meeting.resolutions.push(resolutions[i]);
        let elips = "RAKIBBEPULEBRAHIM";
        let r = resolutions[i].title;
        let index = r.indexOf(elips) + elips.length +1;
        let test;
        title = r.substr(index);
        str += "<li>" + title + "</li>";
      }
      str += "</ul>";
      const mailOptions = {
        to: receivers,
        subject: "invitation",
        html: `<div>
            
            <div>
              <p>
                <strong>Title :</strong>${meeting.title}
              </p>
            </div>
           <div><strong>Resolutions:</strong></div>
            <div >${str}</div>
            <div>
              please go to this <a href="#">link</a> and take neccessary action.
            </div>
          </div>`,
      };
      meeting.save().then((response) => {
        const mail = sendMail(mailOptions);
        res.json({ data: response });
      });
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

exports.query = async (req, res) => {
  const objId = req.params.obj;
  const committeeName = req.params.id;
  const meeting = committeeName + "meetings";
  const { resolutions } = req.body;
  const Meetings = mongoose.model(meeting, meetingSchema);
  const { data } = req.body;
  //console.log(data);
  let regex = new RegExp(data, "i");
  // const filterd = await Model.find({ $and: [ { $or: [{title: regex },{description: regex}] }, {category: value.category}, {city:value.city} ] })
  // console.log(regex);
  // const response = await Meetings.find({$and: [{$or:[{title: regex},{agendas:regex}]}]})
  try {
    const meetings = await Meetings.find({});
    //console.log(meetings.length);
    let result = [];
    const patterns = data.split(" ");
    //console.log(patterns);
    let regexA = [];
    for (let i = 0; i < patterns.length; i++) {
      let ob;
      ob = patterns[i];
      //console.log(ob);
      let reg = new RegExp(ob, "i");
      regexA.push(new RegExp(ob, "i"));
    }
    //console.log(regexA);
    for (let i = 0; i < meetings.length; i++) {
      let resolution = meetings[i].resolutions;
      let j;
      for (j = 0; j < resolution.length; j++) {
        let title = "";
        title = resolution[j].title;
        let elips = "RAKIBBEPULEBRAHIM";
        let index = title.indexOf(elips) + elips.length;
        let test;
        title = title.substr(index);
        meetings[i].resolutions[j] = title;
        for (let k = 0; k < regexA.length; k++) {
          //console.log(title);
          test = title.match(regexA[k]);
          //console.log(test);
          if (test != null) {
            result.push(title);
            break;
          }
        }
        //if (test != null) break;
      }
    }
    res.json({ data: result });
  } catch (err) {
    res.json(err);
  }
};
