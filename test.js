var Mongo = require("./model/mongodb");

function F_send_request(request){
    return new Promise((request)=>{
        
    })
}

Mongo.on("message",(res)=>{
    for(let i of res){
        F_send_request(i);
    }
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