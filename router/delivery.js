var passport = require('passport');
var config = require('../config/main');
var jwt = require('jsonwebtoken');
var Delivery = require('../models/delivery');
var User = require('../models/user');

var express = require('express');
// route for delivery

var deliveryRoute = express.Router();

deliveryRoute.post('/register', /*passport.authenticate('jwt', { session: false}),*/ (req, res) => {
    
    let newdelivery = new Delivery({
        userId: req.body.userId,
        date: req.body.date,
        serialNumber: req.body.serialNumber,
        sortedRma: req.body.sortedRma,
        rmaSuplier: req.body.rmaSuplier,
        rmaValue: req.body.rmaValue,
        successfulOrderFacilitated: req.body.successfulOrderFacilitated,
        personInCharge: req.body.personInCharge,
        deliveryDone: req.body.deliveryDone,
        costOfDelivery: req.body.costOfDelivery,
        expenses: req.body.expenses
             
    });
    //Attemt to save the new delivery record 
    Delivery.create(newdelivery, (err, delivery) =>{
        if(err){
            return res.json({
                success: false,
                 message: "Record Not Created. Record already exist. Check Date"
                })
        } 
        res.json({
            success: true, 
            message: 'Sucessfully Created new Record.', 
            user: delivery,
            
        });
    });
});

deliveryRoute.get('/get', passport.authenticate('jwt', { session: false}), (req, res) =>  {
    Delivery.find()
    .then(delivery => {
        res.json({
            success: true,
            message: 'delivery records  found',
            delivery: delivery
        });
    })
    .catch(err => {
        res.json({
            success: false,
            message: 'delivery records not found',
            delivery: ''
        });
    });
});

deliveryRoute.get('/fetch/:userId', /*passport.authenticate('jwt', { session: false}),*/ (req, res) =>  {
    var userId = req.params.userId;
    Delivery.find({'userId' : userId})
    .then(delivery => {
        res.json({
            success: true,
            message: 'delivery records  found',
            delivery: delivery
        });
    })
    .catch(err => {
        res.json({
            success: false,
            message: 'delivery records not found',
            delivery: ''
        });
    });
});

deliveryRoute.get('/fetch-by-date/:startDate/:endDate/:userId' /*passport.authenticate('jwt', { session: false})*/, (req, res) => {
    var startDate = req.params.startDate;
    var endDate = req.params.endDate;
    var userId = req.params.userId;
    Delivery.find({
        date: {
            $gte: startDate,
            $lte: endDate
        },
        userId: userId
    })
    .then(delivery => {
            res.json({
                success: true,
                message: 'Delivery found',
                delivery: delivery
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'Delivery not found',
                delivery: ''
            });
        });
});


deliveryRoute.post('/update', /*passport.authenticate('jwt', { session: false}),*/ (req, res) => {
    id = req.body._id;
    query = {
        userId: req.body.userId,
        date: req.body.date,
        serialNumber: req.body.serialNumber,
        sortedRma: req.body.sortedRma,
        rmaSuplier: req.body.rmaSuplier,
        rmaValue: req.body.rmaValue,
        successfulOrderFacilitated: req.body.successfulOrderFacilitated,
        personInCharge: req.body.personInCharge,
        deliveryDone: req.body.deliveryDone,
        costOfDelivery: req.body.costOfDelivery,
        expenses: req.body.expenses
 
    };
Delivery.findByIdAndUpdate(id, query, {new:true})
        .then(delivery => {
            res.json({
                success: true,
                message: 'delivery record updated',
                delivery: delivery
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'delivery record not found',
                delivery: ''
            });
        });
});

deliveryRoute.delete('/delete/:id', /*passport.authenticate('jwt', { session: false}),*/ (req, res) => {
    
  Delivery.findByIdAndRemove(req.params.id)
        .then(delivery => {
            res.json({
                success: true,
                message: 'delivery record deleted',
                delivery: delivery
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'delivery record not found',
                delivery: ''
            });
        });
});

module.exports = deliveryRoute;
