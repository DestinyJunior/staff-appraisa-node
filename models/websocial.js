var mongoose = require('mongoose');

var WebSocialSchema = new mongoose.Schema({
   userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    loginInTime: {
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
    twetterFollwers: {
        type: Number,
        required: true
    },
    twetterPost: {
        type: Number,
        required: true
    },
    logOutTime: {
        type: String,
        required: true
    }
   
});

module.exports = mongoose.model('websocial', WebSocialSchema);