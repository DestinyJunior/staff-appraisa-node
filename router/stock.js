var passport = require('passport');
var config = require('../config/main');
var jwt = require('jsonwebtoken');
var Stock = require('../models/stock');
var User = require('../models/user');

var express = require('express');
// route for stock

var stockRoute = express.Router();

stockRoute.post('/register', /*passport.authenticate('jwt', { session: false}),*/ (req, res) => {
    
    let newStock = new Stock({
        userId: req.body.userId,
        date: req.body.date,
        serialNumber: req.body.serialNumber,
        sortedRma: req.body.sortedRma,
        rmaSuplier: req.body.rmaSuplier,
        rmaValue: req.body.rmaValue,
        successfulOrderFacilitated: req.body.successfulOrderFacilitated,
        personInCharge: req.body.personInCharge,
        logistics: req.body.logistics
             
    });
    //Attemt to save the new stock record 
    Stock.create(newStock, (err, stock) =>{
        if(err){
            return res.json({
                success: false, 
                message: err
            })
        } 
        res.json({
            success: true, 
            message: 'Sucessfully Created new stock record.', 
            user: stock,
            
        });
    });
});

stockRoute.get('/get', passport.authenticate('jwt', { session: false}), (req, res) =>  {
    Stock.find()
    .then(stock => {
        res.json({
            success: true,
            message: 'stock records  found',
            stock: stock
        });
    })
    .catch(err => {
        res.json({
            success: false,
            message: 'stock records not found',
            stock: ''
        });
    });
});

stockRoute.get('/fetch/:userId', /*passport.authenticate('jwt', { session: false}),*/ (req, res) =>  {
    var userId = req.params.userId;
    Stock.find({'userId' : userId})
    .then(stock => {
        res.json({
            success: true,
            message: 'stock records  found',
            stock: stock
        });
    })
    .catch(err => {
        res.json({
            success: false,
            message: 'stock records not found',
            stock: ''
        });
    });
});

stockRoute.post('/update', /*passport.authenticate('jwt', { session: false}),*/ (req, res) => {
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
    logistics: req.body.logistics
   };
Stock.findByIdAndUpdate(stockId, query, {new:true})
        .then(stock => {
            res.json({
                success: true,
                message: 'stock record updated',
                stock: stock
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'stock record not found',
                stock: ''
            });
        });
});

stockRoute.delete('/delete/:id', /*passport.authenticate('jwt', { session: false}),*/ (req, res) => {
    
  Stock.findByIdAndRemove(req.params.id)
        .then(stock => {
            res.json({
                success: true,
                message: 'stock record deleted',
                stock: stock
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'stock record not found',
                stock: ''
            });
        });
});

module.exports = stockRoute;
