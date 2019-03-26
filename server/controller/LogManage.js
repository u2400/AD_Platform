const O_MongoDB = new require("../model/mongodb");
const ObjectId = require('mongodb').ObjectId;
const db_name = "log";

var mod = function(act,value) {
    var O_Operating_List = {};

    O_Operating_List["delete"] = function(arr,table_name) {
        let id_arr = [];
        while (arr.length != 0) { 
            let id = arr.pop();
            id_arr.push({"_id" : ObjectId(id)});
        }
        O_MongoDB.start("delete",[{$or: id_arr}],{table_name: table_name, JustOne: false});
        return true;
    }

    O_Operating_List["show"] = async function(table_name) {
        return new Promise((resolve,reject) => {
            O_MongoDB.start("find", [], {table_name: table_name}, function(res) {
                resolve(res);
            });
        });
    }
    //TODO... Get the data entry in the data table
    O_Operating_List["count"] = async function(json = {}, table_name = "site") {
        console.log(`In LogManage.js O_Operating_List["count"] \n json:`,json,`\ntable_name:`,table_name,"\n");
        return new Promise((resolve, reject) => {
            O_MongoDB.start("count", json, {table_name: table_name, db_name: db_name}, function(res) {
                resolve(res);
            });
        })
    }

    try {
        var res = O_Operating_List[act](...value);
    }
    catch(e) {
        res = false;
        throw e;
    }
    finally {
        return res;
    }
}
module.exports = mod;