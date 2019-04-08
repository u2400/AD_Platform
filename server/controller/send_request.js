const F_send_request = require("../component/send_request");
const Promise_mongo = require("../model/Promise_mongo");
const tmp_db_name = "tmp";
const crypto = require("crypto");

//发送请求
var mod = async function([workspace_name, id_array, option]){

    option = option || {};
    option.hash = crypto.pbkdf2Sync((new Date()).toString(), crypto.randomBytes(128), 1, 64, 'sha512').toString("hex");
    let tmp_table_name = crypto.pbkdf2Sync((new Date()).toString(), crypto.randomBytes(128), 1, 64, 'md5').toString("hex").substring(0,50);

    let res = await F_send_request(workspace_name, id_array, option);
    // 将返回的内容保存成一个数组的形式返回
    res.forEach((res) => {
        //TODO.. 在这里将数据逐条写入临时数据库. 
        let response = res[0].toJSON();
        delete response.request;
        Promise_mongo("insert", {request: res[0].toJSON().request, response}, {db_name: tmp_db_name, table_name: tmp_table_name});
    })
}

 module.exports = mod;