const O_Mongo = require("../model/mongodb");
var ObjectId = require('mongodb').ObjectId;

var mod = async function(id){
    var file = "";
    O_Mongo.on("message",function(res){
        file = res[0].file;
        console.log(file);
    })
    O_Mongo.start("find",[{_id: ObjectId(id)},{'projection':{file: 1}}])
    return await [file.file_name,file.file_content];
}

module.exports = mod;