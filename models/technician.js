var mongoose = require('mongoose');

var technicianSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    successfulWorkDone: {
        type: Number,
        required: false
    },
    revenueFromSuccessfulWork: {
        type: Number,
        required: true
    },
    workInProgress: {
        type: Number,
        required: true
    },
    specialFaultCleared: {
        type: String,
        required: true
    },
    techNewsPostedOnWebsite: {
        type: String,
        required: false
    }        
});

module.exports = mongoose.model('Technician', technicianSchema);