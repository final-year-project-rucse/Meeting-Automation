const Committees = require("../model/committees");
const passport = require("passport");
const validatePostInput = require("../validation/committees");

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
exports.addCommittee = (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const newCommittee = new Committees({
        title: req.body.title,
        presidentName: req.body.presidentName,
    });
    newCommittee.save().then((post) => res.json(post));
};