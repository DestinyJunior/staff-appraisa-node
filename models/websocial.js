var mongoose = require('mongoose');

var WebSocialSchema = new mongoose.Schema({
   userId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
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
        required: true
    },
    twitterPost: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('websocial', WebSocialSchema);