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

exports.delteTeacher = async(req, res) => {
 const {id} = req.body;
 try{
  const response = await Teachers.deleteOne({_id:id});
  res.status(200).json({ success: true, data: response })
 }catch(err){
   res.status(400).json({ success: false, data:err})
 }
};
