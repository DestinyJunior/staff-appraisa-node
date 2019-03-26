var mongoose = require('mongoose');

var MailmonitoringSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    entryTime: {
        type: String,
        required: true
    },
    responseTime: {
        type: String,
        required: true
    },
    noResponse: {
        type: String,
        required: true
    },
    customerWaitingtime: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('mailmonitoring', MailmonitoringSchema);