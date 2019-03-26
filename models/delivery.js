var mongoose = require('mongoose');

var DeliverySchema = new mongoose.Schema({
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
        required: true
    },
   deliveryDone: {
        type: Number,
        required: true
    },
    costOfDelivery: {
        type: Number,
        required: false
    },
    expenses: {
        type: Number,
        required: true
    }     
});

module.exports = mongoose.model('delivery', DeliverySchema);