//var passport = require('passport');
//var config = require('../config/main');
//var jwt = require('jsonwebtoken');
var FitiAdmin = require('../models/fitiadmin');
var express = require('express');

var fitiadminRouter = express.Router();

fitiadminRouter.post('/fitiadmin', (req, res) => {
    
        let newFitiAdmin = new FitiAdmin({
            //userId: req.user._id,
            date: req.body.date,
            numberOfRegistration: req.body.numberOfRegistration,
            amountFromRegistration: req.body.amountFromRegistration,
            abandonedCertificate: req.body.abandonedCertificate,
            unresolvedReconciliation: req.body.unresolvedReconciliation,
            dueDebtFromTrainees: req.body.dueDebtFromTrainees,
            pendingCertificateWithAuditor : req.body.pendingCertificateWithAuditor,
            traineeWaitingForCertificates: req.body.traineeWaitingForCertificates,
            numberOfStaff: req.body.numberOfStaff,
            absentTrainees: req.body.absentTrainees,
            expenses: req.body.expenses
            
                    
        });
        FitiAdmin.create(newFitiAdmin, (err, FitiAdmin) =>{
            if(err){
                console.log(newFitiAdmin)
                return res.json({
                    success: false, 
                    message: 'This admin already exit'
                })
            } 
            res.json({
                success: true, 
                message: 'Sucessfully Created new fitiadmin.',
                FitiAdmin: FitiAdmin
                
                });
        });
});
fitiadminRouter.get('/get', (req, res) => {
    FitiAdmin.find()
        .then(fitiadmin => {
            res.json({
                success: true,
                message: 'Admin found',
                fitiadmin: fitiadmin
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'Admin not found',
                fitiadmin: ''
            });
        });
});
fitiadminRouter.get('/update',  (req, res) => {
    const query = req.query;
    const fitiadminId = query.id;
    delete query.id;

    FitiAdmin.findByIdAndUpdate(fitiadminId, query, {new:true})
        .then(fitiadmin => {
            res.json({
                success: true,
                message: 'Admin update',
                fitiadmin: fitiadmin
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'Admin not found',
                fitiadmin: ''
            });
        });
});
fitiadminRouter.get('/delete/:id',  (req, res) => {
    
    FitiAdmin.findByIdAndRemove(req.params.id)
        .then(fitiadmin => {
            res.json({
                success: true,
                message: 'Admin deleted',
                fitiadmin: fitiadmin
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'Admin not found',
                fitiadmin: ''
            });
        });
});

module.exports = fitiadminRouter;