const mongoose = require("mongoose");
const validator = require("validator");

const membersSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, `member name is required`],
    },
    email:{
        type: String,
        trim: true,
        required: [true, `member email is required`],
        unique: true,

    },
   
}, { timestamps: true });


module.exports =  membersSchema ;