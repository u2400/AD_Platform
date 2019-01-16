const request = require("request");
var Mongo = require("./model/mongodb");

Mongo.on("message",(res)=>{
    new Promise((res)=>{
        for (let i of res){
            console.log(i);
        }
    })
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