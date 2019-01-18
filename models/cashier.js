var mongoose = require('mongoose');

var CashierSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    loginTime: {
        type: Date,
        required: true
    },
   numberOfTransactions: {
        type: Number,
        required: true
    },
    amountOfUnresolvedReconcilation: {
        type: Number,
        required: true
    },
    cashShortage: {
        type: Number,
        required: true
    },
    cashOverage: {
        type: Number,
        required: true
    },
  debtFromCustomers: {
        type: Number,
        required: true
    },
    stockCollectionExpenses: {
        type: Number,
        required: true
    },
    logout: {
        type: Date,
        required: true
    }     
});

module.exports = mongoose.model('Cashier',CashierSchema);