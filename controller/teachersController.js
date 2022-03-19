const Teachers = require("../model/teachers");
const passport = require("passport");
const mongoose = require("mongoose");

//const validatePostInput = require("../validation/members");

exports.test = (req, res) => {
  return res.json({
    success: true,
    data: "test",
  });
};

exports.getTeachers = (req, res) => {
  Teachers.find({}, (err, members) => {
    if (err)
      return res.json({
        success: false,
        data: [],
      });
    return res.json({
      success: true,
      data: members,
    });
  });
};

exports.addTeacher = (req, res) => {
  console.log(req);
  const newteacher = new Teachers({
    name: req.body.name,
    email: req.body.email,
  });
  newteacher.save().then((post) => res.json(post));
};
