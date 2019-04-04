var passport = require('passport');
var config = require('../config/main');
var jwt = require('jsonwebtoken');
var Solar = require('../models/solar');
var User = require('../models/user');

var express = require('express');

// route for solar

var solarRoute = express.Router();

solarRoute.post('/register',/* passport.authenticate('jwt', { session: false}),*/ (req, res) => {
    
        let newSolar = new Solar({
            userId: req.body.userId,//req.param._id,
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
                return res.json({
                    success: false, 
                    message: "Record Not Created. Record already exist. Check Date"
                })
            } 
            res.json({
                success: true, 
                message: 'Sucessfully Created new Record.', 
                user: solar,
               
            });
        });
});

solarRoute.get('/get', passport.authenticate('jwt', { session: false}), (req, res) =>  {
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

    solarRoute.get('/fetch/:userId', /*passport.authenticate('jwt', { session: false}),*/ (req, res) =>  {
        var userId = req.params.userId;
        Solar.find({'userId' : userId})
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

    solarRoute.post('/update', /*passport.authenticate('jwt', { session: false}),*/ (req, res) => {
        id = req.body._id;

        query = {
            userId: req.body.userId,//req.param._id,
            date: req.body.date,
            newInstallation: req.body.newInstallation,
            totalSalesFromNewInstallation: req.body.totalSalesFromNewInstallation,
            routineMaintenance: req.body.routineMaintenance,
            salesFromRoutineMaintenance: req.body.salesFromRoutineMaintenance,
            salesFromRepairWork: req.body.salesFromRepairWork,
            debtFromCustomers : req.body.debtFromCustomers,
            numberOfStaff: req.body.numberOfStaff,
            expenses: req.body.expenses
                 
        };
    Solar.findByIdAndUpdate(id, query, {new:true})
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

    solarRoute.get('/fetch-by-date/:startDate/:endDate/:userId' /*passport.authenticate('jwt', { session: false})*/, (req, res) => {
        var startDate = req.params.startDate;
        var endDate = req.params.endDate;
        var userId = req.params.userId;
        Solar.find({
            date: {
                $gte: startDate,
                $lte: endDate
            },
            userId: userId
        })
        .then(solar => {
                res.json({
                    success: true,
                    message: 'Solar found',
                    solar: solar
                });
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: 'Solar not found',
                    solar: ''
                });
            });
    });
    

    solarRoute.delete('/delete/:id', /*passport.authenticate('jwt', { session: false}),*/ (req, res) => {
    
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