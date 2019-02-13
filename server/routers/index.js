const express = require('express');
const router = new express.Router();
const log = require('../controller/log.js');

router
    .get('/log',(req,res)=>{
        log();
        return res.send("OK!");
    })
    .get('/test',(req,res)=>{
        return res.send(file_download());
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