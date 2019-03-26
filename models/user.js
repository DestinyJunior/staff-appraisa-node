var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var UserSchema = new mongoose.Schema({
        firstName: {
            type: String,
            uppercase: true,
            required: true,
            trim: true
        },        
        lastName: {
            type: String,
            uppercase: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: false
        },
        dateOfBirth: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        educationalBackground:{
            type: String,
            required: true
        },
        guarantorName: {
            type: String,
            required: true
        },
        guarantorPhoneNumber: {
            type: String,
            required: true
        },
        appointmentDate: {
            type: Date,
            required: false
        },
        portfolio: {
            type: String,
            required: false
        },
        salary: {
            type: String,
            required: false
        },
        numberOfLeaveUsed: {
            type: Number,
            required: false
        },
        daysAbsent: {
            type: Number,
            required:  false
        },
        role: {
            type: String,
            required: true
        },
        branch : {
            type: String,
            required: true
        }       

});

//save the user's hashed password
UserSchema.pre('save', function(next) {
    var user = this;
    if(this.isModified('password') || this.isNew){
        bcrypt.genSalt(10, function(err, salt) {
            if(err){
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if(err){
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

//create method to comare password
UserSchema.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, function(err, isMatch) {
        if(err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('User', UserSchema);