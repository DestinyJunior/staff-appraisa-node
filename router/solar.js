var passport = require('passport');
var config = require('../config/main');
var jwt = require('jsonwebtoken');
var Solar = require('../models/solar');
var User = require('../models/user');

var express = require('express');

// route for solar

var solarRoute = express.Router();

solarRoute.post('/register', passport.authenticate('jwt', { session: false}), (req, res) => {
    
        let newSolar = new Solar({
            userId: req.user._id,//req.param._id,
            date: req.body.date,
            newInstallation: req.body.newInstallation,
            totalSalesFromNewInstallation: req.body.totalSalesFromNewInstallation,
            routineMaintenance: req.body.routineMaintenance,
            salesFromRoutineMaintenance: req.body.salesFromRoutineMaintenance,
            salesFromRepairWork: req.body.salesFromRepairWork,
            debtFromCustomers : req.body.debtFromCustomers,
            numberOfStaff: req.body.numberOfStaff,
            expenses: req.body.expenses
                 
        });
        //Attemt to save the new solar record 
        Solar.create(newSolar, (err, solar) =>{
            if(err){
                return res.json({success: false, message: 'An error occurred try again later'})
            } 
            res.json({
                success: true, 
                message: 'Sucessfully Created new solar record.', 
                solar: solar,
                user: req.user._id
            });
        });
});

solarRoute.get('/', passport.authenticate('jwt', { session: false}), (req, res) =>  {
            Solar.find()
            .then(solar => {
                res.json({
                    success: true,
                    message: 'Solar records  found',
                    solar: solar
                });
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: 'Solar records not found',
                    solar: ''
                });
            });
    });

    solarRoute.get('/update', passport.authenticate('jwt', { session: false}), (req, res) => {
        const query = req.query;
        const solarId = query.id;
        delete query.id;
    Solar.findByIdAndUpdate(solarId, query, {new:true})
            .then(solar => {
                res.json({
                    success: true,
                    message: 'Solar record updated',
                    solar: solar
                });
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: 'Solar record not found',
                    solar: ''
                });
            });
    });

    solarRoute.delete('/delete/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    
        Solar.findByIdAndRemove(req.params.id)
            .then(solar => {
                res.json({
                    success: true,
                    message: 'solar record deleted',
                    solar: solar
                });
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: 'solar record not found',
                    solar: ''
                });
            });
    });





    module.exports = solarRoute;