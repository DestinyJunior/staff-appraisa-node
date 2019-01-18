var mongoose = require('mongoose');

var SolarSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    newInstallation: {
        type: String,
        required: true
    },
    totalSalesFromNewInstallation: {
        type: Number,
        required: true
    },
    routineMaintenance: {
        type: Number,
        required: true
    },
    salesFromRoutineMaintenance: {
        type: Number,
        required: true
    }, 
    salesFromRepairWork: {
        type: Number,
        required: true
    },
    debtFromCustomers: {
        type: Number,
        required: true
    },
    numberOfStaff: {
        type: Number,
        required: true
    },
    expenses: {
        type: Number,
        required: true
    }        
});

module.exports = mongoose.model('Solar', SolarSchema);