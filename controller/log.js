const O_GetLogFromFile = require("../tools/GetFileLog");
const F_ConversionToObject = require("../tools/ConversionToObject");
const mongodb = require("../model/mongodb");
var mod = function(path = "./web_log_10"){
    O_GetLogFromFile.on("message",function(){
        new Promise((resolve,reject)=>{
            F_ConversionToObject(arguments[0],resolve);
        })
        .then((requests)=>{
            console.log(arguments);
            mongodb("insert",requests);
        })
        .catch((e)=>{
            console.log(e);
        })
    });
    O_GetLogFromFile.start(path);
}
module.exports = mod;