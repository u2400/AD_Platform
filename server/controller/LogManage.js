const O_MongoDB = require("../model/mongodb");
const ObjectId = require('mongodb').ObjectId;
const db_name = "log";

var mod = function(act,value){
    var O_Operating_List = {};

    O_Operating_List["delete"] = function(arr,table_name){
        let id_arr = [];
        while (arr.length != 0){
            let id = arr.pop();
            id_arr.push({"_id" : ObjectId(id)});
        }
        O_MongoDB.start("delete",{$or: id_arr},{table_name: table_name, JustOne: false});
        return true
    }

    O_Operating_List["show"] = async function(table_name){
        return new Promise((resolve,reject)=>{
            O_MongoDB.on("message",function(res){
                resolve(res);
            });

            O_MongoDB.start("find",[],{table_name: table_name});
        });
    }

    return O_Operating_List[act](...value);
}
module.exports = mod;