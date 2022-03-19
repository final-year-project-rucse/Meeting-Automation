const mongoose = require("mongoose");
const validator = require("validator");

const teachersSchema = new mongoose.Schema({
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


const Teachers = mongoose.model("teachers", teachersSchema);

module.exports = Teachers;