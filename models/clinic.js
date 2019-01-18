var mongoose = require('mongoose');

var ClinicSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    totalSales: {
        type: Number,
        required: true
    },
    refund: {
        type: String,
        required: true
    },
    shortage: {
        type: Number,
        required: true
    },    
    debtFromCustomers: {
        type: Number,
        required: true
    },
    unresolvedReconciliation: {
        type: String,
        required: true
    },
    abandonedJob: {
        type: Number,
        required: true
    },
    successfulTransactions: {
        type: Number,
        required: true
    },
    workInProgress: {
        type: Number,
        required: true
    },
    numberOfTransaction: {
        type: Number,
        required: true
    },
    numberOfStaff: {
        type: Number,
        required: true
    }        
});

module.exports = mongoose.model('clinic', ClinicSchema);