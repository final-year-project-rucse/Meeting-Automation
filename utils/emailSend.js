const nodemailer = require("nodemailer");
const { emailFrom, password } = require("../configure/emailConfig");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailFrom,
    pass: password,
  },
});

module.exports = function Mail(data) {
  const mailOptions = {
    from: emailFrom,
    to: data.to,
    subject: data.subject,
    html: data.html,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return error;
    } else {
      console.log("Email sent: " + info.response);
      return info.response;
    }
  });
};
// const mailOptions2 = {
//   from: 'meetingautomation.ru@gmail.com',
//   to: 'bepul.cse.ru@gmail.com',
//   subject: 'Invoices due',
//   text: 'hiii'
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });
