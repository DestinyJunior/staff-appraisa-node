var mongoose = require('mongoose');

var SaleSchema = new mongoose.Schema({
    staffId: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    cashRefund: {
        type: Number,
        required: true
    },
    singleInvoice: {
        type: String,
        required: true
    },
    shortageInSuspenseAcct: {
        type: Number,
        required: true
    },
    unresolvedReconciliation: {
        type: String,
        required: true
    },
    debtFromCustomers: {
        type: Number,
        required: true
    },
    totalSales: {
        type: Number,
        required: true
    },
    closingBalance: {
        type: Number,
        required: true
    },
    numberOfTransactions: {
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
    },
    
});

module.exports = mongoose.model('sales', SaleSchema);