var passport = require('passport');
var config = require('../config/main');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var express = require('express');
//Create API group routes
var userRoute = express.Router();

userRoute.post('/register', (req, res) => {
    if(!req.body.email || !req.body.password){
        return res.json({success: false, message: 'Please enter an email and password to register.'})
    } else {
        let newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            dateOfBirth: req.body.dateOfBirth,
            email: req.body.email,
            password: req.body.password,
            educationalBackground: req.body.educationalBackground,
            address : req.body.address,
            guarantorPhoneNumber: req.body.guarantorPhoneNumber,
            guarantorName: req.body.guarantorName,
            appointmentDate: req.body.appointmentDate,
            portfolio: req.body.portfolio,
            salary: req.body.salary,
            numberOfLeaveUsed: req.body.numberOfLeaveUsed,
            daysAbsent: req.body.daysAbsent         
        });
        //Attemt to save the new users
        User.create(newUser, (err, user) =>{
            if(err){
                return res.json({success: false, message: 'This user already exist'})
            } 
            res.json({success: true, message: 'Sucessfully Created new staff.', user: user});
        });
    }
});

//Authenticate the user get a JWT
userRoute.post('/authenticate', (req, res) => {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if(err) throw err;

        if(!user){
            res.send({success: false, message: 'Authentication failed. User not found'});
        } else {
            //Check if the password matches
            user.comparePassword(req.body.password, (err, isMatch) => {
                if(isMatch && !err){
                    var token = jwt.sign({data:user}, config.secret, {
                        expiresIn: 604800 //a week
                    });
                    res.json({success: true, token: 'JWT ' + token, user: user})
                } else {
                    res.send({success: false, message: 'Authentication failed. Passwords did not match'});
                }
            });
        }
    });
});

// Protect dashboard route with JWT
userRoute.get('/dashboard', passport.authenticate('jwt', { session: false}), (req, res) => {
    res.send('It worked! User id is: ' + req.user._id + '.');
});

userRoute.get('/get', (req, res) => {
    User.find()
        .then(user => {
            res.json({
                success: true,
                message: 'state found',
                user: user
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'state not found',
                user: ''
            });
        });
});

module.exports = userRoute;