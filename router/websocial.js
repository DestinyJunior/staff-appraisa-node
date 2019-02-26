var passport = require('passport');
var config = require('../config/main');
var jwt = require('jsonwebtoken');
var WebSocial = require('../models/websocial');
var express = require('express');

var websocialRouter = express.Router();

websocialRouter.post('/register', /*passport.authenticate('jwt', { session: false}),*/ (req, res) => {
    
        let newwebsocial = new WebSocial({
            userId: req.body.userId,
            date: req.body.date,
            facebookLikes: req.body.facebookLikes,
            instagramFollowers: req.body.instagramFollowers,
            postOnFacebook: req.body.postOnFacebook,
            postOnInstagram: req.body.postOnInstagram,
            twitterFollowers : req.body.twitterFollowers,
            twitterPost: req.body.twitterPost
            
            
                    
        });
        WebSocial.create(newwebsocial, (err, websocial) =>{
            if(err){
                console.log(newwebsocial)
                return res.json({
                    success: false, 
                    message: err
                })
            } 
            res.json({
                success: true, 
                message: 'Sucessfully Created new staff.',
                 user: websocial
                
                });
        });
 
});
websocialRouter.get('/get', passport.authenticate('jwt', { session: false}), (req, res) => {
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
websocialRouter.get('/update', passport.authenticate('jwt', { session: false}), (req, res) => {
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
websocialRouter.get('/delete/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    
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
