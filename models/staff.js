var mongoose = require('mongoose');


var StaffSchema = new mongoose.Schema({
        firstName: {
            type: String,
            uppercase: true,
            required: true,
            trim: true
        },        
        lastName: {
            type: String,
            uppercase: true,
            required: true,
            trim: true
        },
        phoneNumber: {
            type: String,
            required: false
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        educationalBackground:{
            type: String,
            required: true
        },
        guarantorName: {
            type: String,
            required: true
        },
        guarantorPhoneNumber: {
            type: String,
            required: true
        },
        appointmentDate: {
            type: Date,
            required: true
        },
        portfolio: {
            type: String,
            required: true
        },
        salary: {
            type: String,
            required: true
        },
        numberOfLeaveUsed: {
            type: Number,
            required: true
        },
        daysAbsent: {
            type: Number,
            required:  true
        }       

});

module.exports = mongoose.model('Staff', StaffSchema);