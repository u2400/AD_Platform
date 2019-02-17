const express = require('express');
const router = new express.Router();
const log = require('../controller/log.js');
const F_file_download = require("../controller/FileDownload");
const F_WorkSpaceManage = require("../controller/WorkspaceManage");
require("../test");

router
    .get('/',(req,res)=>{
        return res.send(`<a href="/download/5c540823294a3231e02ca4a3">test</a>`);
    })
    .get('/get_log/:Workspace_name',(req,res)=>{
        return res.send(
            // F_WorkSpaceManage[]
        );
    })
    .get('/download/:id',async (req,res)=>{
        let [name,content] = await F_file_download(req.params.id);
        console.log("END!",name,content);
        res.setHeader('Content-disposition', 'attachment; filename=' + name);
        return res.send(new Buffer.from(content));
    })
    .get('/send',(req,res)=>{
        return res.send("OK!");
     })
    .use(function (err, req, res, next) {
        console.log(err);
        res.status(500).send('服务发生错误');
    });

module.exports = (app)=>{
    app.use('/',router);
}