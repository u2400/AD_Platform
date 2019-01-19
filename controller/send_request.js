const request = require("request");
var Mongo = require("./model/mongodb");

var mod = function(){
    Mongo.on("message",(res)=>{
        console.log(res);
    })

    Mongo.start("find", [{}, {
      'projection': {
          time: 1,
          unixdate: 1
      },
      "sort": [
          ['unixdate', 1]
      ]
    }]);
}
module.exports = mod;