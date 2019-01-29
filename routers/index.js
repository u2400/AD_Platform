const express = require('express');
const router = new express.Router();
const log = require('../controller/log.js');

router.get('/log',async(req,res)=>{
    log(req);
})
    .get('/',(req,res)=>{
        return res.send('hello world');
    })
    .use(function (err, req, res, next) {
        console.log(err);
        res.status(500).send('服务发生错误');
    });

module.exports = (app)=>{
    app.use('/',router);
}