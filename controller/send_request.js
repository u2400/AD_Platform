const request = require('request');
var Mongo = require("../model/mongodb");

function F_send_request(req,host){
    return new Promise(function(resolve,reject){
        console.log(req.method);
        request({
            method: req.method,
            uri: host
        },
        function (error, response, body) {
            if (error) {
                reject(error);
            }
            resolve([response,body]);
        })
    })
}

function F_data_analysis(data){
    return data 
}

var mod = function(data,host = "127.0.0.1"){

    if(host.search(/^https?:\/\//) == -1){
        host = "http://" + host;
    }

    Mongo.on("message",(res)=>{
        for(let i of res){
            F_send_request(i,host)
            .then((res)=>{
                console.log(res);
            })
            .catch((error)=>{
                console.error(error);
            })
        }
    })

    Mongo.start("find", [{

    }, {
        "sort": [
            ['unixdate', 1]
        ]
    }])
}

module.exports = mod;