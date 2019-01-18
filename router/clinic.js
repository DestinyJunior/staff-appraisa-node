var passport = require('passport');
var config = require('../config/main');
var jwt = require('jsonwebtoken');
var clinic = require('../models/clinic');
var User = require('../models/user');

var express = require('express');
// route for clinic

var clinicRoute = express.Router();

clinicRoute.post('/register', passport.authenticate('jwt', { session: false}), (req, res) => {
    
    let newclinic = new clinic({
        userId: req.user._id,//req.param._id,
        date: req.body.date,
        totalSales: req.body.totalSales,
        refund: req.body.refund,
        shortage: req.body.shortage,
        debtFromCustomers: req.body.debtFromCustomers,
        unresolvedReconciliation: req.body.unresolvedReconciliation,
        abandonedJob: req.body.abandonedJob,
        successfulTransactions: req.body.successfulTransactions,
        workInProgress: req.body.workInProgress,
        numberOfTransaction: req.body.numberOfTransaction,
        numberOfStaff: req.body.numberOfStaff
             
    });
    //Attemt to save the new clinic record 
    clinic.create(newclinic, (err, clinic) =>{
        if(err){
            return res.json({success: false, message: 'An error occurred try again later'})
        } 
        res.json({
            success: true, 
            message: 'Sucessfully Created new clinic record.', 
            clinic: clinic,
            user: req.user._id
        });
    });
});

clinicRoute.get('/', passport.authenticate('jwt', { session: false}), (req, res) =>  {
    clinic.find()
    .then(clinic => {
        res.json({
            success: true,
            message: 'clinic records  found',
            clinic: clinic
        });
    })
    .catch(err => {
        res.json({
            success: false,
            message: 'clinic records not found',
            clinic: ''
        });
    });
});

clinicRoute.get('/update', passport.authenticate('jwt', { session: false}), (req, res) => {
    const query = req.query;
    const clinicId = query.id;
    delete query.id;
clinic.findByIdAndUpdate(clinicId, query, {new:true})
        .then(clinic => {
            res.json({
                success: true,
                message: 'clinic record updated',
                clinic: clinic
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'clinic record not found',
                clinic: ''
            });
        });
});

clinicRoute.delete('/delete/:id', (req, res) => {
    
  clinic.findByIdAndRemove(req.params.id)
        .then(clinic => {
            res.json({
                success: true,
                message: 'clinic record deleted',
                clinic: clinic
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'clinic record not found',
                clinic: ''
            });
        });
});

module.exports = clinicRoute;