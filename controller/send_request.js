const request = require("request");
var Mongo = require("./model/mongodb");

function F_send_request(request){
    let req = request; //Enable Promise to accept the corresponding parameters
    return new Promise((req)=>{
        console.log(req);
        // request({
        //     method: req.method,
        // },
        // function (error, response, body) {
        //     if (error) {
        //     return console.error('upload failed:', error);
        //     }
        //     console.log('Upload successful!  Server responded with:', body);
        // })
    })
}

var mod = function(data){

    Mongo.on("message",(res)=>{
        for(let i of res){
            F_send_request(i);
        }
    })

    Mongo.start("find", [{

    }, {
        // 'projection': {
        //     time: 1,
        //     unixdate: 1
        // },
        "sort": [
            ['unixdate', 1]
        ]
    }])
}

module.exports = mod;