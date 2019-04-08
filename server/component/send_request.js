const request = require('request');
let F_Promise_mongo = require("../model/Promise_mongo");
const ObjectId = require('mongodb').ObjectId;
const db_name = "System";
const RandomStr = require("../tools/RandomStr");
const sleep = require("../tools/Sleep");

function F_send_request(req,host,table_name = "site") {
    return new Promise(function(resolve,reject) {
        let O_http_request = {};//Defining http request object
        delete req.header.Host;
        O_http_request.headers = req.header;
        O_http_request.method = req.method;
        O_http_request.uri = host;
        if(req.Post) {
            O_http_request.body = req.Post.join("&");
        }

        request( O_http_request,
            function (error, response, body) {
                if (error) {
                    reject(error);
                }
                resolve([response,body]);
            }
        )
    })
}

function F_data_analysis(data) {
    if( !data || (JSON.stringify(data) === "[]") || (JSON.stringify(data) === "{}") ) {
        throw new Error("from component/send_request.js: data must not be empty");
    }
    if( data.__proto__.constructor == Object ) {
        throw new Error("from component/send_request.js: Object type data is not supported");
    }
    
    var new_data = [];
    data.forEach(element => {
        new_data.push({_id: ObjectId(element)});
    });

    return new_data;
}

var mod = async function(table_name, id_arr = {}, option) {
    console.log(arguments);
    let host = option.host || "127.0.0.1/nnnn.php";
    var id_arr = F_data_analysis(id_arr);

    //automatically added if no protocol is specified
    if(host.search(/^https?:\/\//) == -1) {
        host = "http://" + host;
    }

    //通过指定id获取数据库中的请求头.
    let Promise_list = [];
    let Res_list = [];
    F_Promise_mongo("find", [{
        $or: id_arr
    },
    {
        //按时间顺序排序
        "sort": [['unixdate', 1]]
    }], {
         //指定数据表(即工作区)名称
        table_name: table_name
    })
    .then((res) => {
        for(let i of res) {
            let p = 
            F_send_request(i,host)
            .catch((error) => {
                console.error(error);
            })
            .then((res) => {
                Res_list.push(res);
            })
            Promise_list.push(p);
        }
    })
    
    while(JSON.stringify(Promise_list) === "[]") {
        console.log("sleep");
        await sleep(10);
    }
    await Promise.all(Promise_list);
    return Res_list;
}

module.exports = mod;