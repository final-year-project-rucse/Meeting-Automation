const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const crypto = require("crypto");

const committeesSchema = new mongoose.Schema({
    committeName: {
        type: String,
        trim: true,
        required: [true, `committe name is required`],
    },
    presidentName: {
        type: String,
        trim: true,
        required: [true, "president name is required"],
    },
}, { timestamps: true });

const Committes = mongoose.model("Committes", committeesSchema);

module.exports = Committes;