var mongoose = require('mongoose');

var DeliverySchema = new mongoose.Schema({
    //userId: {
        //type: String,
        //required: true
    //},
    date: {
        type: Date,
        required: true
    },
    loginTime: {
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
        required: true
    },
    costOfItemRepaired: {
        type: Number,
        required: true
    },
    salesContribution: {
        type: String,
        required: true
    },
    logout: {
        type: String,
        required: true
    },
    offDay: {
        type: String,
        required: true
    },
    leaveDay: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('delivery', DeliverySchema);