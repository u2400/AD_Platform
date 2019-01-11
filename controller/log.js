const O_GetLogFromFile = require("../tools/GetFileLog");
const F_ConversionToObject = require("../tools/ConversionToObject");

var mod = function(path = "./web_log_10"){
    O_GetLogFromFile.on("message",function(){
        new Promise((resolve,reject)=>{
            F_ConversionToObject(arguments[0],resolve);
        })
        .then((requests)=>{
            //带插入逻辑写入数据库.
        })
        .catch((e)=>{
            console.log(e);
        })
    });
    O_GetLogFromFile.start(path);
}
module.exports = mod;