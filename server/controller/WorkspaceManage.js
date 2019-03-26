const O_MongoDB = require("../model/mongodb");
const LogManage = require("./LogManage");
const db_name = "log";
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

    O_Operating_List["show"] = async function() {
        return new Promise((resolve,reject) => {
            let mongo_1 = new O_MongoDB();
            let mongo_2 = new O_MongoDB();
            mongo_1.start("collections",{},{db_name},function(res) {
                res.then( res => { // 查询所有的工作区
                    let table_list = [];
                    res.forEach( ele => {
                        table_list.push( ele.name );
                    });
                    return table_list;
                })
                .catch( err => {
                    console.log("In WorkspaceManage.js operating show search all workspace error:");
                    console.log(err);
                })
                .then( async res => { //查询工作区中的日志数量
                    let list = [];
                    let PromiseList = [];
                    for(let i of res) {
                        PromiseList.push(
                            new Promise((resolve, reject)=>{
                                mongo_2.start("count",{},{table_name:i, db_name}, (res) => {
                                    res.then( num => {
                                        resolve({name: i, num});                                        
                                    })
                                })
                            })
                            .then(res => {
                                list.push(res);
                            })
                        )
                    }
                    await Promise.all(PromiseList); //等待所有的查询完毕后返回
                    return list;
                })
                .catch(err => {
                    console.log("In WorkspaceManage.js operating show search log num error:");
                    console.log(err);
                })
                .then( res => {
                    resolve(res);
                })
            });
        })
        .catch(err => {
            console.log("In WorkspaceManage.js operating show unexpected error:");
            console.log(err);
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