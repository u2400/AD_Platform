const express = require('express');
const router = new express.Router();
const log = require('../controller/log.js');
const file_download = require("../controller/FileDownload");

router
    .get('/log',(req,res)=>{
        // log();
        return res.send(`<a href="/test/5c540823294a3231e02ca4a3">test</a>`);
    })
    .get('/test/:id',async (req,res)=>{
        let [name,content] = await file_download(req.params.id);
        console.log("END!",name,content);
        res.setHeader('Content-disposition', 'attachment; filename=' + name);
        return res.send(new Buffer.from(content));
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