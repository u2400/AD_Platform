// const { exec } =  require("child_process");

// exec("python test.py -s 123",function() {
//     console.log(arguments);
// });

// const O_MongoDB = require("./model/mongodb");
// const db_name = "System";
// const table_name = "Workspace";
// const name = "test";
// var ObjectId = require('mongodb').ObjectId;

// O_Mongo.on("message",function(res){
//     console.log(res);
// })
// O_Mongo.start("find",[{$or:[{"_id" : ObjectId("5c540823294a3231e02ca4a1")},{"_id" : ObjectId("5c540823294a3231e02ca4a6")}]},{'projection':{_id: 1}}])

// var pass = require("./tools/Passwod");
// var username = "test1";
// var key = "123";
// var ip = "1111111";
// let [random_hash, Cookie] = pass.LoginCookieGenerator([username, key, ip]);
// console.log(`Cookie:${Cookie}`,`random_hash:${random_hash}`);
// var res = pass.LoginCookieChecker([Cookie, random_hash, username, key, ip]);
// console.log(res);

// (function(){
//     O_MongoDB.start("insert",[{WorkspaceName: name}],{db_name: db_name, table_name: table_name});
//     return true;
// })();


// const log = require("./controller/log");
// log();

// const F_send_request = require("./component/send_request");
// F_send_request([
//     "5c6e092677cf2c1ae415e8bb",
//     "5c6e092677cf2c1ae415e8ba",
//     "5c6e092677cf2c1ae415e8bc"
// ])

var LogManage = require("./controller/LogManage");
const O_MongoDB = require("./model/mongodb");
const db_name = "System";
const table_name = "Workspace";

O_Operating_List = {};
O_Operating_List["push"] = function(name, num) {
    O_MongoDB.start("update",[{WorkspaceName: name},{$set:{num: num}}],{db_name:db_name, table_name: table_name, JustOne: true});
    return true;
};

(function(table_name) {
    new Promise(async (resolve, reject) => {
        let num = await LogManage("count", {}, {db_name:"log", table_name: table_name});
        console.log(num);
        resolve(num);
    })
    .then(num => {
        O_Operating_List["push"](table_name, num);
        return true;
    })
})('test1');


