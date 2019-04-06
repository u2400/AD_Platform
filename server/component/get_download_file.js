const O_Mongo = require("../model/mongodb");
var ObjectId = require('mongodb').ObjectId;

var mod = async function(id){
    return new Promise((resolve, reject)=>{
        var file = "";
        O_Mongo.start("find",[{_id: ObjectId(id)},{'projection':{file: 1}}], function(res){
            file = res[0].file;
            resolve([file.file_name,file.file_content]);
        })
    })
}

module.exports = mod;