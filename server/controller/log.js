const O_GetLogFromFile = require("../tools/GetFileLog");
const F_ConversionToObject = require("../tools/ConversionToObject");
const mongodb = require("../model/mongodb");
const F_GetRequestsFile = require("../tools/GetRequestFile");
const F_GetParameter = require("../tools/GetParameter");
const F_WorkspaceManage = require("./WorkspaceManage");

var mod = function(workspace_name, data){
    O_GetLogFromFile.on("message",function(){
        new Promise((resolve,reject)=>{
            F_ConversionToObject(arguments[0],resolve);
        })
        .then((requests)=>{
            requests.file = F_GetRequestsFile(requests.body); //Get the file in the request
            [requests.PostObj,requests.Post] = F_GetParameter(requests.body);

            F_WorkspaceManage("push",[workspace_name, 1]);
            mongodb.start("insert",requests,{table_name: workspace_name});
        })
        .catch((e)=>{
            console.log(e);
        })
    });
    O_GetLogFromFile.start(data);
}
module.exports = mod;