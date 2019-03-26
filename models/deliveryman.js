var mongoose = require('mongoose');

var DeliveryManSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    itemDelivered: {
        type: String,
        required: true
    },
    costOfItemDelivered: {
        type: Number,
        required: true
    },
    itemrepaired: {
        type: String,
        required: false
    },
    costOfItemRepaired: {
        type: Number,
        required: true
    },
    salesContribution: {
        type: String,
        required: true
    },
    offDay: {
        type: String,
        required: false
    },
    leaveDay: {
        type: String,
        required: false
    }

});

module.exports = mongoose.model('deliveryman', DeliveryManSchema);