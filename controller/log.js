const O_GetLogFromFile = require("../tools/GetFileLog");
const F_ConversionToObject = require("../tools/ConversionToObject");

var mod = function(path = "./web_log_10"){
    O_GetLogFromFile.on("message",function(){
        console.log(arguments);
    });
    O_GetLogFromFile.start(path);
}
module.exports = mod;