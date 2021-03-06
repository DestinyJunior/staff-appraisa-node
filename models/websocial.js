var mongoose = require('mongoose');

var WebSocialSchema = new mongoose.Schema({
   userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        unique : true
    },
    facebookLikes: {
        type: Number,
        required: true
    },
    instagramFollowers: {
        type: Number,
        required: true
    },
    postOnFacebook: {
        type: Number,
        required: true
    },
    postOnInstagram: {
        type: Number,
        required: true
    },
    twitterFollowers: {
        type: Number,
        required: false
    },
    twitterPost: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('websocial', WebSocialSchema);