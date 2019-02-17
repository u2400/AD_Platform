// const { exec } =  require("child_process");

// exec("python test.py -s 123",function() {
//     console.log(arguments);
// });

// const crypto = require('crypto');

// console.log((Date.now() - old)/1000/100);
// console.log(key.toString("hex"),salt.toString("hex"));
const O_Mongo = require("./model/mongodb");

O_Mongo.on("message",function(res){
    console.log(res.length);
})
O_Mongo.start("find",[{_id: 1},{'projection':{_id: 1}}])