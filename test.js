var Mongo = require("./model/mongodb");
var log = require(".//controller/log");
log();
function F_send_request(request){
    let req = request;
    return new Promise((req)=>{
        console.log(request.header);
        request
    })
}

Mongo.on("message",(res)=>{
    for(let i of res){
        F_send_request(i);
    }
})

var r = Mongo.start("find", [{
    
}, {
    // 'projection': {
    //     time: 1,
    //     unixdate: 1
    // },
    "sort": [
        ['unixdate', 1]
    ]
}])