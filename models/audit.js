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
        required: true
    },
    statementReconciliationAtBranches: {
        type: String,
        required: true
    },
    stockTakingAtBranches: {
        type: String,
        required: true
    },
    POSReconciliationAtBranches: {
        type: String,
        required: true
    },
    correctionFromCashier: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('audit', auditSchema);