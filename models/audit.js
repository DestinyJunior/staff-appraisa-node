var mongoose = require('mongoose');

var auditSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    disputedTransaction: {
        type: String,
        required: true
    },
    suspensedShortageAcrossBranches: {
        type: String,
        required: true
    },
    overallDebtFromCustomer: {
        type: Number,
        required: true
    },
    unresolvedReconciliationAtBranches: {
        type: String,
        required: false
    },
    statementReconciliationAtBranches: {
        type: String,
        required: false
    },
    stockTakingAtBranches: {
        type: String,
        required: false
    },
    POSReconciliationAtBranches: {
        type: String,
        required: false
    },
    correctionFromCashier: {
        type: String,
        required: false
    }

});

module.exports = mongoose.model('audit', auditSchema);