var mongoose = require('mongoose');

var FitiAdminSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    numberOfRegistration: {
        type: Number,
        required: true
    },
    amountFromRegistration: {
        type: Number,
        required: true
    },
    abandonedCertificate: {
        type: Number,
        required: true
    },
    unresolvedReconciliation: {
        type: String,
        required: true
    },
    dueDebtFromTrainees: {
        type: Number,
        required: true
    },
    pendingCertificateWithAuditor: {
        type: Number,
        required: false
    },
    traineeWaitingForCertificates: {
        type: Number,
        required: true
    },
    numberOfStaff: {
        type: Number,
        required: true
    },
    absentTrainees: {
        type: String,
        required: true
    },
    expenses: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('fitiadmin', FitiAdminSchema);