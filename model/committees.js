const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const crypto = require("crypto");

const committeesSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, `committe name is required`],
    },
    presidentName: {
        type: String,
        trim: true,
        required: [true, "president name is required"],
    },
    email: {
        type: String,
        trim: true,
        required: [true, `Email is required`],
        validate: [
          validator.isEmail,
          "Not an email, please provide correct email",
        ],
        unique: true,
      },
}, { timestamps: true });

const Committees = mongoose.model("Committees", committeesSchema);

module.exports = Committees;