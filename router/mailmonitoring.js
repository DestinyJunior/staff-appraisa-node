var passport = require('passport');
var config = require('../config/main');
var jwt = require('jsonwebtoken');
var Mailmonitoring = require('../models/mailmonitoring');
var express = require('express');

var MailmonitoringRouter = express.Router();

MailmonitoringRouter.post('/register', /*passport.authenticate('jwt', { session: false}),*/ (req, res) => {
    
        let newMailmonitoring = new Mailmonitoring({
            userId: req.body.userId,
            date: req.body.date,
            entryTime: req.body.entryTime,
            responseTime: req.body.responseTime,
            noResponse: req.body.noResponse,
            customerWaitingtime: req.body.customerWaitingtime
           
                    
        });
        Mailmonitoring.create(newMailmonitoring, (err, mailmonitoring) =>{
            if(err){
                console.log(newMailmonitoring)
                return res.json({
                    success: false, 
                    message: err
                })
            } 
            res.json({
                success: true, 
                message: 'Sucessfully Created new mailmonitoring.',
                 user: mailmonitoring
                
                });
        });
});
MailmonitoringRouter.get('/get', passport.authenticate('jwt', { session: false}), (req, res) => {
    Mailmonitoring.find()
        .then(mailmonitoring => {
            res.json({
                success: true,
                message: 'mailmonitoring found',
                mailmonitoring: mailmonitoring
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'mailmonitoring not found',
                mailmonitoring: ''
            });
        });
});

MailmonitoringRouter.get('/fetch/:userId', /*passport.authenticate('jwt', { session: false}),*/ (req, res) => {
    var userId = req.params.userId;
    Mailmonitoring.find({'userId' : userId})
        .then(mailmonitoring => {
            res.json({
                success: true,
                message: 'mailmonitoring found',
                mailmonitoring: mailmonitoring
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'mailmonitoring not found',
                mailmonitoring: ''
            });
        });
});

MailmonitoringRouter.post('/update', /*passport.authenticate('jwt', { session: false}),*/ (req, res) => {
    id = req.body._id;

    query = {
            userId: req.body.userId,
            date: req.body.date,
            entryTime: req.body.entryTime,
            responseTime: req.body.responseTime,
            noResponse: req.body.noResponse,
            customerWaitingtime: req.body.customerWaitingtime
    };

    Mailmonitoring.findByIdAndUpdate(mailmonitoringId, query, {new:true})
        .then(mailmonitoring => {
            res.json({
                success: true,
                message: 'mailmonitoring update',
                mailmonitoring: mailmonitoring
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'mailmonitoring not found',
                mailmonitoring: ''
            });
        });
});
MailmonitoringRouter.get('/delete/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    
    Mailmonitoring.findByIdAndRemove(req.params.id)
        .then(mailmonitoring => {
            res.json({
                success: true,
                message: 'mailmonitoring deleted',
                mailmonitoring: mailmonitoring
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'mailmonitoring not found',
                mailmonitoring: ''
            });
        });
});


module.exports = MailmonitoringRouter;