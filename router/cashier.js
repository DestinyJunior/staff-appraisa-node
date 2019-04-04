var passport = require('passport');
var config = require('../config/main');
var jwt = require('jsonwebtoken');
var Cashier = require('../models/cashier');
var User = require('../models/user');

var express = require('express');
// route for cashier

var cashierRoute = express.Router();

cashierRoute.post('/register', /*passport.authenticate('jwt', { session: false}),*/ (req, res) => {
    
        let newCashier = new Cashier({
            userId: req.body.userId,
            date: req.body.date,
            numberOfTransactions: req.body.numberOfTransactions,
            amountOfUnresolvedReconcilation: req.body.amountOfUnresolvedReconcilation,
            cashShortage: req.body.cashShortage,
            cashOverage: req.body.cashOverage,
            debtFromCustomers : req.body.debtFromCustomers,
            stockCollectionExpenses: req.body.stockCollectionExpenses
                 
        });
        //Attemt to save the new solar record 
       Cashier.create(newCashier, (err, cashier) =>{
            if(err){
                console.log(newCashier);
                return res.json({
                    success: false,
                     message: "Record Not Created. Record already exist. Check Date"
                    })
            } 
            res.json({
                success: true, 
                message: 'Sucessfully Created new Record.', 
                user: cashier,
                
            });
        });
});

cashierRoute.get('/get', passport.authenticate('jwt', { session: false}), (req, res) =>  {
    Cashier.find()
    .then(cashier => {
        res.json({
            success: true,
            message: 'cashier records  found',
            cashier: cashier
        });
    })
    .catch(err => {
        res.json({
            success: false,
            message: 'cashier records not found',
            cashier: ''
        });
    });
});

cashierRoute.get('/fetch/:userId', /*passport.authenticate('jwt', { session: false}),*/ (req, res) =>  {
    var userId = req.params.userId;
    Cashier.find({'userId' : userId})
    .then(cashier => {
        res.json({
            success: true,
            message: 'cashier records  found',
            cashier: cashier
        });
    })
    .catch(err => {
        res.json({
            success: false,
            message: 'cashier records not found',
            cashier: ''
        });
    });
});

cashierRoute.get('/fetch-by-date/:startDate/:endDate/:userId' /*passport.authenticate('jwt', { session: false})*/, (req, res) => {
    var startDate = req.params.startDate;
    var endDate = req.params.endDate;
    var userId = req.params.userId;
    Cashier.find({
        date: {
            $gte: startDate,
            $lte: endDate
        },
        userId: userId
    })
    .then(cashier => {
            res.json({
                success: true,
                message: 'Cashier found',
                cashier: cashier
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'cashier not found',
                cashier: ''
            });
        });
});


cashierRoute.post('/update', /*passport.authenticate('jwt', { session: false}),*/ (req, res) => {
                id = req.body._id;
                query = {
                userId: req.body.userId,
                date: req.body.date,
                numberOfTransactions: req.body.numberOfTransactions,
                amountOfUnresolvedReconcilation: req.body.amountOfUnresolvedReconcilation,
                cashShortage: req.body.cashShortage,
                cashOverage: req.body.cashOverage,
                debtFromCustomers : req.body.debtFromCustomers,
                stockCollectionExpenses: req.body.stockCollectionExpenses
         };   

    Cashier.findByIdAndUpdate(id, query, {new:true})
            .then(cashier => {
                res.json({
                    success: true,
                    message: 'Solar record updated',
                    cashier: cashier
                });
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: 'Cashier record not found',
                    solar: ''
                });
            });
});

cashierRoute.delete('/delete/:id',/* passport.authenticate('jwt', { session: false}),*/ (req, res) => {
    
   Cashier.findByIdAndRemove(req.params.id)
        .then(cashier => {
            res.json({
                success: true,
                message: 'cashier record deleted',
                cashier: cashier
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'cashier record not found',
                cashier: ''
            });
        });
});

module.exports = cashierRoute;