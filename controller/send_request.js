const request = require("request");
var Mongo = require("./model/mongodb");

Mongo.on("message",(res)=>{
    console.log(res);
})

var r = Mongo.start("find", [{}, {
    'projection': {
        time: 1,
        unixdate: 1
    },
    "sort": [
        ['unixdate', 1]
    ]
}]);