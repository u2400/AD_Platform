const express = require('express');
const router = new express.Router();
const log = require('../controller/log.js');
const F_file_download = require("../controller/FileDownload");
const F_WorkSpaceManage = require("../controller/WorkspaceManage");
const F_LogManage = require("../controller/LogManage");
require("../test");

router
    .use((req, res, next)=>{
        res.setHeader('auth', 'isauth');
        res.setHeader('Content-Type', 'application/json');
        // if(Math.random()>0.5){
        //     res.status(302).location("/");
        // }
        next();
    })
    .get('/uploadlog/:Workspace_name',(req,res)=>{
        log(path, req.params.Workspace_name);
        return res.send(`<a href="/download/5c540823294a3231e02ca4a3">test</a>`);
    })
    .get('/getlogfile/:Workspace_name',(req,res)=>{
        return res.send(`OK`);
    })
    .get('/getalllog/:Workspace_name',async (req,res)=>{
        var log = await F_LogManage("show",[req.params.Workspace_name]);
        return res.json(log);
    })
    .get('/getworkspace',async (req,res)=>{
        var Workspace = await F_WorkSpaceManage('show');
        return res.send(Workspace);
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
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({error:"server error"});
    });

module.exports = (app)=>{
    app.use('/api',router);
}