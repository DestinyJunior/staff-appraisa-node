var passport = require('passport');
var config = require('../config/main');
var jwt = require('jsonwebtoken');
var Audit = require('../models/audit');
var express = require('express');

var AuditRouter = express.Router();

AuditRouter.post('/register', /*passport.authenticate('jwt', { session: false}),*/ (req, res) => {
    
        let newAudit = new Audit({
            userId: req.body.userId,
            date: req.body.date,
            disputedTransaction: req.body.disputedTransaction,
            suspensedShortageAcrossBranches: req.body.suspensedShortageAcrossBranches,
            overallDebtFromCustomer: req.body.overallDebtFromCustomer,
            unresolvedReconciliationAtBranches: req.body.unresolvedReconciliationAtBranches,
            statementReconciliationAtBranches: req.body.statementReconciliationAtBranches,
            stockTakingAtBranches: req.body.stockTakingAtBranches,
            POSReconciliationAtBranches: req.body.POSReconciliationAtBranches,
            correctionFromCashier: req.body.correctionFromCashier
           
                    
        });
        Audit.create(newAudit, (err, audit) =>{
            if(err){
                console.log(newAudit)
                return res.json({
                    success: false, 
                    message: err
                })
            } 
            res.json({
                success: true, 
                message: 'Sucessfully Created new Audit.',
                 user: audit
                
                });
        });
});
AuditRouter.get('/get', passport.authenticate('jwt', { session: false}), (req, res) => {
    Audit.find()
        .then(audit => {
            res.json({
                success: true,
                message: 'Audit found',
                audit: audit
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'delivery not found',
                audit: ''
            });
        });
});
AuditRouter.get('/update', passport.authenticate('jwt', { session: false}), (req, res) => {
    const query = req.query;
    const auditId = query.id;
    delete query.id;

    Audit.findByIdAndUpdate(auditId, query, {new:true})
        .then(audit => {
            res.json({
                success: true,
                message: 'Audit update',
                audit: audit
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'Audit not found',
                audit: ''
            });
        });
});
AuditRouter.get('/delete/:id', passport.authenticate('jwt', { session: false}),  (req, res) => {
    
    Audit.findByIdAndRemove(req.params.id)
        .then(audit => {
            res.json({
                success: true,
                message: 'Audit deleted',
                audit: audit
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'Audit not found',
                audit: ''
            });
        });
});


module.exports = AuditRouter;