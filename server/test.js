// const { exec } =  require("child_process");

// exec("python test.py -s 123",function() {
//     console.log(arguments);
// });

// const O_Mongo = require("./model/mongodb");
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
console.log(__dirname);