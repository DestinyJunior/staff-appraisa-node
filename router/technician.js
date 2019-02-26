var passport = require('passport');
var config = require('../config/main');
var jwt = require('jsonwebtoken');
var Technician = require('../models/technician');
var User = require('../models/user');

var express = require('express');
// route for technician

var technicianRoute = express.Router();

technicianRoute.post('/register',/* passport.authenticate('jwt', { session: false}),*/ (req, res) => {
    
    let newTechnician = new Technician({
        userId: req.body.userId,
        date: req.body.date,
        successfulWorkDone: req.body.successfulWorkDone,
        revenueFromSuccessfulWork: req.body.revenueFromSuccessfulWork,
        workInProgress: req.body.workInProgress,
        specialFaultCleared: req.body.specialFaultCleared,
        techNewsPostedOnWebsite: req.body.techNewsPostedOnWebsite
             
    });
    //Attemt to save the new technician record 
    Technician.create(newTechnician, (err, technician) =>{
        if(err){
            console.log(newTechnician);
            return res.json({success: false, message: err})
        } 
        res.json({
            success: true, 
            message: 'Sucessfully Created new technician record.', 
            user: technician,
            
        });
    });
});

technicianRoute.get('/', passport.authenticate('jwt', { session: false}), (req, res) =>  {
    Technician.find()
    .then(technician => {
        res.json({
            success: true,
            message: 'technician records  found',
            technician: technician
        });
    })
    .catch(err => {
        res.json({
            success: false,
            message: 'technician records not found',
            technician: ''
        });
    });
});

technicianRoute.get('/update', passport.authenticate('jwt', { session: false}), (req, res) => {
    const query = req.query;
    const technicianId = query.id;
    delete query.id;
Technician.findByIdAndUpdate(technicianId, query, {new:true})
        .then(technician => {
            res.json({
                success: true,
                message: 'technician record updated',
                technician: technician
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'technician record not found',
                technician: ''
            });
        });
});

technicianRoute.delete('/delete/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    
  Technician.findByIdAndRemove(req.params.id)
        .then(technician => {
            res.json({
                success: true,
                message: 'technician record deleted',
                technician: technician
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'technician record not found',
                technician: ''
            });
        });
});

module.exports = technicianRoute;
