const request = require('request');
var Mongo = require("../model/mongodb");
const ObjectId = require('mongodb').ObjectId;


function F_send_request(req,host,table_name = "site"){
    return new Promise(function(resolve,reject){
        let O_http_request = {};//Defining http request object

        delete req.header.Host;
        O_http_request.headers = req.header;
        O_http_request.method = req.method;
        O_http_request.uri = host;
        if(req.Post){
            O_http_request.body = req.Post.join("&");
        }
        console.log(req);

        request(O_http_request,
        function (error, response, body) {
            if (error) {
                reject(error);
            }
            resolve([response,body]);
        })
    })
}

function F_data_analysis(data){
    if( !data || (JSON.stringify(data) === "[]") || (JSON.stringify(data) === "{}") ){
        throw new Error("from component/send_request.js: data must not be empty");
    }
    if( data.__proto__.constructor == Object ){
        throw new Error("from component/send_request.js: Object type data is not supported");
    }
    
    var new_data = [];
    data.forEach(element => {
        new_data.push({_id: ObjectId(element)});
    });

    return new_data;
}

var mod = function(data = "",host = "127.0.0.1/nnnn.php", table_name){

    var id_arr = F_data_analysis(data);

    if(host.search(/^https?:\/\//) == -1){
        host = "http://" + host;
    }

    F_send_request(data, host);
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
        $or: id_arr
    },
    {
        "sort": [['unixdate', 1]]
    }], {
        table_name: table_name
    })
}

module.exports = mod;