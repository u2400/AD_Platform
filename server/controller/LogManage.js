const O_MongoDB = require("../model/mongodb");
const db_name = "log";

var mod = function(act,value){
    var O_Operating_List = {};

    O_Operating_List["delete"] = function(){
        O_MongoDB.start("delete",{WorkspaceName: name},{table_name:db_name, JustOne:true});
        return true
    }

    O_Operating_List["show"] = async function(){
        return new Promise((resolve,reject)=>{
            O_MongoDB.on("message",function(res){
                resolve(res);
            });

            O_MongoDB.start("find",{},{table_name: db_name});
        });
    }

    O_Operating_List[act](...value);
}
module.exports = mod;