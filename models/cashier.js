var mongoose = require('mongoose');

var CashierSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        unique : true
    },
   numberOfTransactions: {
        type: Number,
        required: true
    },
    amountOfUnresolvedReconcilation: {
        type: Number,
        required: false
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
    }   
});

module.exports = mongoose.model('Cashier',CashierSchema);