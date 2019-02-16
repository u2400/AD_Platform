const O_Mongo = require("../model/mongodb");
var ObjectId = require('mongodb').ObjectId;

var mod = async function(id){
    return new Promise(function(resolve, reject){
        var file = "";
        O_Mongo.on("message",function(res){
            file = res[0].file;
            resolve([file.file_name,file.file_content]);
        })
        O_Mongo.start("find",[{_id: ObjectId(id)},{'projection':{file: 1}}])
    })
}

module.exports = mod;