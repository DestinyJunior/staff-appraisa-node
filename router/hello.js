var express = require('express');
var hello = express.Router();

hello.get('/', function(req, res){
    res.send("Hello world");
});

hello.get('/hello/:id', function(req, res){
    res.send("Hello" + req.params.id);
});

module.exports = hello;