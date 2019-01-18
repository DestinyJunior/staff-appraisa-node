var passport = require('passport');
var config = require('../config/main');
var jwt = require('jsonwebtoken');
var Mailmonitoring = require('../models/mailmonitoring');
var express = require('express');

var MailmonitoringRouter = express.Router();

MailmonitoringRouter.post('/mailmonitoring', passport.authenticate('jwt', { session: false}), (req, res) => {
    
        let newMailmonitoring = new Mailmonitoring({
            userId: req.user._id,
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
                    message: 'mailmonitoring not found'
                })
            } 
            res.json({
                success: true, 
                message: 'Sucessfully Created new mailmonitoring.',
                 mailmonitoring: mailmonitoring
                
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
MailmonitoringRouter.get('/update', passport.authenticate('jwt', { session: false}), (req, res) => {
    const query = req.query;
    const mailmonitoringId = query.id;
    delete query.id;

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