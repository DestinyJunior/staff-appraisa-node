var mongoose = require('mongoose');

var InstructorSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    numberOfStdTaught: {
        type: Number,
        required: true
    },
    specialSolDev: {
        type: String,
        required: true
    },
    professionalCoursesHandled: {
        type: Number,
        required: true
    },
    newLetterPostedOnWeb: {
        type: String,
        required: true
    },
    offDay: {
        type: String,
        required: true
    },
    leaveDays: {
        type: Number,
        required: true
    },
   
});

module.exports = mongoose.model('instructors', InstructorSchema);