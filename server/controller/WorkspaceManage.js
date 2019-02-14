const O_MongoDB = require("../model/mongodb");
const db_name = Workspace

mod = function(){
    var O_Operating_List = {};
    
    O_Operating_List["add"] = function(name){
        O_MongoDB.start("insert",{WorkspaceName: name},db_name);
    }

    O_Operating_List["delete"] = function(){
        O_MongoDB.start("delete",{WorkspaceName: name},db_name);
    }

    O_Operating_List["rename"] = function(){

    }

    O_Operating_List["show"] = function(){

    }

}
module.exports = mod;