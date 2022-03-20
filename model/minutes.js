const mongoose = require("mongoose");

const minutesSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, `member name is required`],
    },
    location:{
        type: String,
        trim: true,
        
    },
    date:{
        type: Date,
        default:  Date.now()

    },
    time:{
        type: String,

    },
    attendess:[
        {
            name:{
                type: String,
            },
            email:{
                type: String,
            }
        }
    ],
    agendas:[
        {
            text:{
                type: String,
            }
        }
    ]

}, { timestamps: true });


module.exports =  minutesSchema ;