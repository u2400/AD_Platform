const express = require('express');
const router = new express.Router();
const log = require('../controller/log.js');
const F_file_download = require("../controller/FileDownload");
const F_WorkSpaceManage = require("../controller/WorkspaceManage");
const F_LogManage = require("../controller/LogManage");
const upload = require("../tools/FileUpload");
const send_requests = require("../controller/SendRequest");

router
    .use((req, res, next) => {
        res.setHeader('auth', 'isauthed');
        res.setHeader('Content-Type', 'application/json');
        // if(Math.random()>0.5){
        //     res.status(302).location("/");
        // }
        next();
    })
    .post('/uploadlog/:Workspace_name',async (req,res) => {
        let err = await upload(req, res).catch((err) => {
            return err.toString();
        })
        if(err) {
            return res.status(500).json({error: err});
        }
        log(req.params.Workspace_name, `./upload/${req.files[0].filename}`)
        return res.json({state:403});
    })
    .get('/getlogfile/:Workspace_name',(req,res) => {
        return res.send(`OK`);
    })
    .get('/getalllog/:Workspace_name', async (req,res) => {
        var log = await F_LogManage("show",[req.params.Workspace_name]);
        return res.json(log);
    })
    .get('/getworkspace', async (req,res) => {
        var Workspace = await F_WorkSpaceManage('show');
        return res.json(Workspace);
    })
    .get('/download/:id', async (req,res) => {
        let [name,content] = await F_file_download(req.params.id);
        res.setHeader('Content-disposition', 'attachment; filename=' + name);
        return res.send(new Buffer.from(content));
    })
    .post("/test", async (req,res) => {
        console.log(req.body);
        res.json(req.body);
    }) 
    .post('/send/:Workspace_name', async (req,res) => {
        console.log(req.body);
        send_requests([req.params.Workspace_name, req.body.id_array, {host: req.body.host, regexp: req.body.regexp}]);
        return res.send(`OK!`);
    })
    .use(function (err, req, res, next) {
        console.log(err);
        res.status(500).json({error:"server error"});
    });
module.exports = (app) => {
    app.use('/api',router);
}
