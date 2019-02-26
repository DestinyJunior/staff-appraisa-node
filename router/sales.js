var passport = require('passport');
var config = require('../config/main');
var jwt = require('jsonwebtoken');
var Sales = require('../models/sales');
var express = require('express');

var salesRouter = express.Router();

salesRouter.post('/register',/* passport.authenticate('jwt', { session: false}),*/ (req, res) => {
    
        let newSales = new Sales({
            userId: req.body.userId,
            date: req.body.date,
            cashRefound: req.body.cashRefound,
            singleInvoice: req.body.singleInvoice,
            shortageInSuspenseAcct: req.body.shortageInSuspenseAcct,
            unresolvedReconciliation: req.body.unresolvedReconciliation,
            debtFromCustomers: req.body.debtFromCustomers,
            totalSales : req.body.totalSales,
            closingBalance: req.body.closingBalance,
            numberOfTransactions: req.body.numberOfTransactions,
            numberOfStaff: req.body.numberOfStaff,
            expenses: req.body.expenses
                    
        });
        Sales.create(newSales, (err, sales) =>{
            if(err){
                console.log(newSales)
                return res.json({
                    success: false, 
                    message: err
                })
            } 
            res.json({
                success: true, 
                message: 'Sucessfully Created new sales.',
                 user: sales
                
                });
        });
});
salesRouter.get('/get', passport.authenticate('jwt', { session: false}), (req, res) => {
    Sales.find()
        .then(sales => {
            res.json({
                success: true,
                message: 'sales found',
                sales: sales
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'sales not found',
                sales: ''
            });
        });
});
salesRouter.get('/update', passport.authenticate('jwt', { session: false}), (req, res) => {
    const query = req.query;
    const salesId = query.id;
    delete query.id;

    Sales.findByIdAndUpdate(salesId, query, {new:true})
        .then(state => {
            res.json({
                success: true,
                message: 'sales update',
                sales: sales
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'sales not found',
                sales: ''
            });
        });
});
salesRouter.get('/delete/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    
    Sales.findByIdAndRemove(req.params.id)
        .then(sales => {
            res.json({
                success: true,
                message: 'sales deleted',
                sales: sales
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'sales not found',
                sales: ''
            });
        });
});


module.exports = salesRouter;