var passport = require('passport');
var config = require('../config/main');
var jwt = require('jsonwebtoken');
var Instructor = require('../models/instructors');
var express = require('express');

var instructorRouter = express.Router();

instructorRouter.post('/register', /*passport.authenticate('jwt', { session: false}),*/ (req, res) => {
    
        let newInstructor = new Instructor({
            userId: req.body.userId,
            date: req.body.date,
            numberOfStdTaught: req.body.numberOfStdTaught,
            specialSolDev: req.body.specialSolDev,
            professionalCoursesHandled: req.body.professionalCoursesHandled,
            newLetterPostedOnWeb: req.body.newLetterPostedOnWeb,
            offDay : req.body.offDay,
            leaveDays: req.body.leaveDays,          
                    
        });
        Instructor.create(newInstructor, (err, Instructor) =>{
            if(err){
                console.log(newInstructor)
                return res.json({
                    success: false, 
                    message: err
                })
            } 
            res.json({
                success: true, 
                message: 'Sucessfully Created new instructor.',
                user: Instructor
                
                });
        });
});
instructorRouter.get('/get', passport.authenticate('jwt', { session: false}), (req, res) => {
    Instructor.find()
        .then(instructor => {
            res.json({
                success: true,
                message: 'instructor found',
                instructor: instructor
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'instructor not found',
                instructor: ''
            });
        });
});

instructorRouter.get('/fetch/:userId', /*passport.authenticate('jwt', { session: false}),*/ (req, res) => {
    var userId = req.params.userId;
    Instructor.find({'userId' : userId})
        .then(instructor => {
            res.json({
                success: true,
                message: 'instructor found',
                instructor: instructor
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'instructor not found',
                instructor: ''
            });
        });
});

instructorRouter.post('/update', /*passport.authenticate('jwt', { session: false}),*/ (req, res) => {
    id = req.body._id;
    query = {
            userId: req.body.userId,
            date: req.body.date,
            numberOfStdTaught: req.body.numberOfStdTaught,
            specialSolDev: req.body.specialSolDev,
            professionalCoursesHandled: req.body.professionalCoursesHandled,
            newLetterPostedOnWeb: req.body.newLetterPostedOnWeb,
            offDay : req.body.offDay,
            leaveDays: req.body.leaveDays,
    };
    Instructor.findByIdAndUpdate(id, query, {new:true})
        .then(instructor => {
            res.json({
                success: true,
                message: 'instructor update',
                instructor: instructor
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'instructor not found',
                instructor: ''
            });
        });
});
instructorRouter.delete('/delete/:id', /*passport.authenticate('jwt', { session: false}),*/ (req, res) => {
    
    Instructor.findByIdAndRemove(req.params.id)
        .then(instructor => {
            res.json({
                success: true,
                message: 'instructor deleted',
                instructor: instructor
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'instructor not found',
                instructor: ''
            });
        });
});

module.exports = instructorRouter
