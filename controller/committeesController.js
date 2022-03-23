const Committees = require("../model/committees");
const passport = require("passport");
const validatePostInput = require("../validation/committees");
const Head = require("../model/head");
const sendMail = require("../utils/emailSend");

function isAlredyExist(email) {
  return new Promise((resolve) => {
    resolve(
      Head.find({ email: email }).then((response) => {
        return response.length;
      })
    );
  });
}
function headEntry(data) {
  return new Promise((resolve) => {
    resolve(
      Head.create(data)
        .then((response) => {
          return true;
        })
        .catch((error) => {
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
exports.getCommittees = (req, res) => {
  Committees.find({}, (err, committees) => {
    if (err)
      return res.json({
        success: false,
      });
    return res.json({
      success: true,
      data: committees,
    });
  });
};
exports.addCommittee = async (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newCommittee = new Committees({
    title: req.body.title,
    presidentName: req.body.presidentName,
    email: req.body.email,
  });
  const check = await isAlredyExist();
  if (check == 0) {
    const { email } = req.body;
    const index = email.indexOf("@");
    const userName = email.substring(0, index);
    const password = Math.random().toString(36).slice(-8);
    //console.log(userName);
    let entry;
    const data = {
      userName: userName,
      email: email,
      password: password,
      confirmPassword: password,
    };

    entry = await headEntry(data);

    const mailOptions = {
      to: email,
      subject: "set up this committee",
      html: `<div>
          <div>
            <h4>Meeting Automation</h4>
          </div>
          <div>email:${email}</div>
          <div>password:${data.password}</div>
          <div>
            please go to this <a href="#">link</a> and take neccessary action.
          </div>
        </div>`,
    };

    console.log("entry", entry);
    if (entry) {
      newCommittee
        .save()
        .then((post) => {
          const ok = sendMail(mailOptions);
          res.json({
            email: ok,
            data: post,
          });
        })
        .catch((error) => res.json({success: false, error: error}));
    } else {
      newCommittee
        .save()
        .then((post) => {
          const ok = sendMail(mailOptions);
          res.json({
            email: ok,
            data: post,
          });
        })
        .catch((error) => res.json({success: false, error: error}));
    }
  }
};
