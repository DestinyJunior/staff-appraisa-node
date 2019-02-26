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

stockRoute.get('/', passport.authenticate('jwt', { session: false}), (req, res) =>  {
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

stockRoute.get('/update', passport.authenticate('jwt', { session: false}), (req, res) => {
    const query = req.query;
    const stockId = query.id;
    delete query.id;
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

stockRoute.delete('/delete/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    
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
