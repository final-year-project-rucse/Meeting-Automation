const membersSchema = require("../model/members");
const passport = require("passport");
const mongoose = require("mongoose");

//const validatePostInput = require("../validation/members");

exports.test = (req, res) => {
  return res.json({
    success: true,
    data: "test",
  });
};

exports.getMembers = (req, res) => {
  const title = req.params.id;

  const Members = mongoose.model(`${title}`, membersSchema);
  Members.find({}, (err, members) => {
    if (err)
      return res.json({
        success: false,
      });
    return res.json({
      success: true,
      data: members,
    });
  });
};

exports.addMembers = (req, res) => {
  const title = req.params.id;
  console.log(req.body);
  const Members = mongoose.model(`${title}`, membersSchema);
  members = req.body.members;
  // console.log(memberss[0]);
  let data = [];
  let i;
  let insert = 0;
  Members.insertMany(members)
    .then((members) => {
      return res.json(members);
    })
    .catch((err) => {
      return res.json(err);
    });
}