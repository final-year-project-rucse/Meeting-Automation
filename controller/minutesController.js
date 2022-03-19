const membersSchema = require("../model/minutes");
const passport = require("passport");
const mongoose = require("mongoose");

//const validatePostInput = require("../validation/members");

exports.test = (req, res) => {
  return res.json({
    success: true,
    data: "test",
  });
};

// exports.getMembers = (req, res) => {
//   const title = req.params.id;

//   const Members = mongoose.model(`${title}`, membersSchema);
//   Members.find({}, (err, members) => {
//     if (err)
//       return res.json({
//         success: false,
//       });
//     return res.json({
//       success: true,
//       data: members,
//     });
//   });
// };

// exports.addMembers = (req, res) => {
//   const title = req.params.id;

//   const Members = mongoose.model(`${title}`, membersSchema);
//   var namess = {};
//   names = req.body.names;
//   // console.log(namess[0]);
//   let data = [];
//   let i;
//   let insert = 0;
//   Members.insertMany(names)
//     .then((names) => {
//       return res.json(names);
//     })
//     .catch((err) => {
//       return res.json(err);
//     });
// }