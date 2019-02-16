const O_MongoDB = require("../model/mongodb");
const db_name = "Workspace";

mod = function(){
    var O_Operating_List = {};
    
    O_Operating_List["add"] = function(name){
        O_MongoDB.start("insert",{WorkspaceName: name},{table_name:db_name});
    }

    O_Operating_List["delete"] = function(){
        O_MongoDB.start("delete",{WorkspaceName: name},{table_name:db_name, JustOne:true});
    }

    O_Operating_List["rename"] = function(new_name, old_name){
        O_MongoDB.start("update",[{WorkspaceName: old_name},{WorkspaceName: new_name}],{table_name: db_name, JustOne});
    }

    O_Operating_List["show"] = async function(){
        return new Promise((resolve,reject)=>{
            O_MongoDB.on("message",function(res){
                resolve(res);
            })
            O_MongoDB.start("find",{},{table_name: db_name});
        });
    }
}
module.exports = mod;