// const { exec } =  require("child_process");

// exec("python test.py -s 123",function() {
//     console.log(arguments);
// });

// const O_Mongo = require("./model/mongodb");

// O_Mongo.on("message",function(res){
//     console.log(res.length);
// })
// O_Mongo.start("find",[{_id: 1},{'projection':{_id: 1}}])

var pass = require("./tools/Passwod");
var username = "test1";
var key = "123";
var ip = "1111111";
let [random_hash, Cookie] = pass.LoginCookieGenerator([username, key, ip]);
console.log(`Cookie:${Cookie}`,`random_hash:${random_hash}`);
var res = pass.LoginCookieChecker([Cookie, random_hash, username, key, ip]);
console.log(res);