const express = require('express');
const router = new express.Router();
const log = require('../controller/log.js');
const file_download = require("../controller/FileDownload");

router
    .get('/log',(req,res)=>{
        // log();
        return res.send(`<a href="/test">test</a>`);
    })
    .get('/test',(req,res)=>{
        // let [name,content] = file_download("5c540823294a3231e02ca4a3");
        console.log(file_download("5c540823294a3231e02ca4a3"));
        // res.setHeader('Content-disposition', 'attachment; filename=' + name);
        res.send("OK!");
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