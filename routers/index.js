const express = require('express');
const router = new express.Router();
const log = require('../controller/log.js');
const test = require("../test");
const Requests = require("../controller/send_request");

router
    .get('/log',(req,res)=>{
        log();
        return res.send("OK!");
    })
    .get('/test',(req,res)=>{
        test();
        return res.send("OK!");
    })
    .get('/send',(req,res)=>{
        Requests();
        return res.send("OK!");
     })
    .use(function (err, req, res, next) {
        console.log(err);
        res.status(500).send('服务发生错误');
    });

module.exports = (app)=>{
    app.use('/',router);
}