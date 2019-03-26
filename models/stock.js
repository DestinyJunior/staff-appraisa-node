var mongoose = require('mongoose');

var StockSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    serialNumber: {
        type: Number,
        required: true
    },
    sortedRma: {
        type: Number,
        required: true
    },
   rmaSuplier: {
        type: String,
        required: false
    },
    rmaValue: {
        type: Number,
        required: true
    },
    successfulOrderFacilitated: {
        type: Number,
        required: true
    },
    personInCharge: {
        type: String,
        required: false
    },
   logistics: {
        type: String,
        required: false
    }        
});

module.exports = mongoose.model('Stock', StockSchema);