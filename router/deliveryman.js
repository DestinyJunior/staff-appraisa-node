var passport = require('passport');
var config = require('../config/main');
var jwt = require('jsonwebtoken');
var DeliveryMan = require('../models/deliveryman');
var express = require('express');

var DeliveryManRouter = express.Router();

DeliveryManRouter.post('/register', /*passport.authenticate('jwt', { session: false}),*/ (req, res) => {
    
        let newDeliveryMan = new DeliveryMan({
            userId: req.body.userId,
            date: req.body.date,
            itemDelivered: req.body.itemDelivered,
            costOfItemDelivered: req.body.costOfItemDelivered,
            itemrepaired: req.body.itemrepaired,
            costOfItemRepaired: req.body.costOfItemRepaired,
            salesContribution: req.body.salesContribution,
            offDay: req.body.offDay,
            leaveDay: req.body.leaveDay,
           
                    
        });
        DeliveryMan.create(newDeliveryMan, (err, delivery) =>{
            if(err){
                console.log(newDeliveryMan)
                return res.json({
                    success: false, 
                    message: err
                })
            } 
            res.json({
                success: true, 
                message: 'Sucessfully Created new deliveryman.',
                 user: delivery
                
                });
        });
});
DeliveryManRouter.get('/get', passport.authenticate('jwt', { session: false}), (req, res) => {
    DeliveryMan.find()
        .then(deliveryman => {
            res.json({
                success: true,
                message: 'deliveryman found',
                deliveryman: deliveryman
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'delivery not found',
                deliveryman: ''
            });
        });
});
DeliveryManRouter.get('/update', passport.authenticate('jwt', { session: false}), (req, res) => {
    const query = req.query;
    const deliveryId = query.id;
    delete query.id;

    DeliveryMan.findByIdAndUpdate(deliveryId, query, {new:true})
        .then(deliveryman => {
            res.json({
                success: true,
                message: 'deliveryman update',
                deliveryman: deliveryman
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'deliveryman not found',
                deliveryman: ''
            });
        });
});
DeliveryManRouter.get('/delete/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    
    DeliveryMan.findByIdAndRemove(req.params.id)
        .then(deliveryman => {
            res.json({
                success: true,
                message: 'deliveryman deleted',
                deliveryman: deliveryman
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'deliveryman not found',
                deliveryman: ''
            });
        });
});


module.exports = DeliveryManRouter;