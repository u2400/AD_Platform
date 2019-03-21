const O_MongoDB = require("../model/mongodb");
const LogManage = require("./LogManage");
const db_name = "System";
const table_name = "Workspace"


var mod = function(act,value = []) {
    var O_Operating_List = {};
    
    O_Operating_List["add"] = function(name) {
        O_MongoDB.start("insert",[{WorkspaceName: name}],{db_name: db_name, table_name: table_name});
        return true;
    }

    O_Operating_List["delete"] = function() {
        O_MongoDB.start("delete",{WorkspaceName: name},{db_name: db_name, table_name: table_name, JustOne:true});
        return true;
    }

    O_Operating_List["rename"] = function(new_name, old_name) {
        O_MongoDB.start("update",[{WorkspaceName: old_name},{WorkspaceName: new_name}],{db_name: db_name, table_name: table_name, JustOne: true});
        return true;
    }

    O_Operating_List["push"] = function(name, num) {
        O_MongoDB.start("update",[{WorkspaceName: name},{$set:{num: num}}],{db_name, table_name, JustOne: true});
        return true;
    };

    O_Operating_List["show"] = async function() {
        return new Promise((resolve,reject) => {
            O_MongoDB.on("message",function(res) {
                var arr = [];
                res.forEach(element => {
                    if(element.WorkspaceName !== null) {
                        arr.push(element);
                    }
                });
                console.log(arr);
                resolve(arr);
            });
            O_MongoDB.start("find",[],{db_name: db_name, table_name: table_name});
        })
        .catch(err => {
            console.log("In WorkspaceManage.js operating show error:");
            console.log(err);
        })
    }

    O_Operating_List["set_count"] = async function(table_name) {
        new Promise(async (resolve, reject) => {
            let num = await LogManage("count",[],{db_name:"log", table_name: table_name});
            resolve(num);
        })
        .then(num => {
            O_Operating_List["push"](table_name, num);
        })
    }

    try {
        var res = O_Operating_List[act](...value);
    }
    catch(e) {
        res = false;
        console.log(e);
    }
    finally {
        return res;
    }
}
module.exports = mod;