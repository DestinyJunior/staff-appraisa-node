var passport = require('passport');
var config = require('../config/main');
var jwt = require('jsonwebtoken');
var Cashier = require('../models/cashier');
var User = require('../models/user');

var express = require('express');
// route for cashier

var cashierRoute = express.Router();

cashierRoute.post('/register', passport.authenticate('jwt', { session: false}), (req, res) => {
    
        let newCashier = new Cashier({
            userId: req.user._id,
            date: req.body.date,
            numberOfTransactions: req.body.numberOfTransactions,
            amountOfUnresolvedReconcilation: req.body.amountOfUnresolvedReconcilation,
            cashShortage: req.body.cashShortage,
            cashOverage: req.body.cashOverage,
            debtFromCustomers : req.body.debtFromCustomers,
            stockCollectionExpenses: req.body.stockCollectionExpenses,
            logout: req.body.logout
                 
        });
        //Attemt to save the new solar record 
       Cashier.create(newCashier, (err, cashier) =>{
            if(err){
                console.log(newCashier);
                return res.json({
                    success: false,
                     message: 'An error occurred try again later'})
            } 
            res.json({
                success: true, 
                message: 'Sucessfully Created new cashier record.', 
                cashier: cashier,
                user: req.user._id
            });
        });
});

cashierRoute.get('/', passport.authenticate('jwt', { session: false}), (req, res) =>  {
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

cashierRoute.get('/update', passport.authenticate('jwt', { session: false}), (req, res) => {
    const query = req.query;
    const cashierId = query.id;
    delete query.id;
Cashier.findByIdAndUpdate(cashierId, query, {new:true})
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
                message: 'Solar record not found',
                solar: ''
            });
        });
});

cashierRoute.delete('/delete/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    
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