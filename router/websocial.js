//var passport = require('passport');
//var config = require('../config/main');
//var jwt = require('jsonwebtoken');
var WebSocial = require('../models/websocial');
var express = require('express');

var websocialRouter = express.Router();

websocialRouter.post('/websocial', (req, res) => {
    
        let newwebsocial = new WebSocial({
            //userId: req.user._id,
            date: req.body.date,
            loginInTime: req.body.loginInTime,
            facebookLikes: req.body.facebookLikes,
            instagramFollowers: req.body.instagramFollowers,
            postOnFacebook: req.body.postOnFacebook,
            postOnInstagram: req.body.postOnInstagram,
            twetterFollwers : req.body.twetterFollwers,
            twetterPost: req.body.twetterPost,
            logOutTime: req.body.logOutTime
            
                    
        });
        WebSocial.create(newwebsocial, (err, websocial) =>{
            if(err){
                console.log(newwebsocial)
                return res.json({
                    success: false, 
                    message: 'This user already exist'
                })
            } 
            res.json({
                success: true, 
                message: 'Sucessfully Created new staff.',
                 websocial: websocial
                
                });
        });
 
});
websocialRouter.get('/get', (req, res) => {
    WebSocial.find()
        .then(websocial => {
            res.json({
                success: true,
                message: 'websocial found',
                websocial: websocial
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'websocial not found',
                websocial: ''
            });
        });
});
websocialRouter.get('/update',  (req, res) => {
    const query = req.query;
    const websocialId = query.id;
    delete query.id;

    WebSocial.findByIdAndUpdate(websocialId, query, {new:true})
        .then(websocial => {
            res.json({
                success: true,
                message: 'websocial update',
                websocial: websocial
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'websocial not found',
                websocial: ''
            });
        });
});
websocialRouter.get('/delete/:id',  (req, res) => {
    
    WebSocial.findByIdAndRemove(req.params.id)
        .then(websocial => {
            res.json({
                success: true,
                message: 'websocial deleted',
                websocial: websocial
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'websocial not found',
                websocial: ''
            });
        });
});
module.exports = websocialRouter;
