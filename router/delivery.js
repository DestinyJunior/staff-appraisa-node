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
                 message: err
                })
        } 
        res.json({
            success: true, 
            message: 'Sucessfully Created new delivery record.', 
            user: delivery,
            
        });
    });
});

deliveryRoute.get('/', passport.authenticate('jwt', { session: false}), (req, res) =>  {
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

deliveryRoute.get('/update', passport.authenticate('jwt', { session: false}), (req, res) => {
    const query = req.query;
    const deliveryId = query.id;
    delete query.id;
Delivery.findByIdAndUpdate(deliveryId, query, {new:true})
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

deliveryRoute.delete('/delete/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    
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
